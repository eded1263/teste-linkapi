import { Router } from "express";
import { pipedriveService } from "~/src/services/pipedrive";
import { SalesModel } from "../../../models/consolidado.model";
import { blingService } from "../../../services/bling";
import { orderParser } from "../../../utils/orderParser";
class ConsolidadosController {
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/consolidados", this.getConsolidados);
    this.router.post("/consolidados", this.postConsolidados);
  }

  async getConsolidados(_req, res) {
    const orders = await SalesModel.find();
    res.json(orders);
  }

  async postConsolidados(_req, res) {
    let deals;
    try {
      deals = await pipedriveService.getAllWonDeals();
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Erro ao buscar por negócios ganhos",
        success: false,
      });
      return;
    }
    const orders = orderParser(deals);
    let dates = [];
    await Promise.all(
      orders.map(async (order) => {
        const { data } = await blingService.saveOrder(JSON.stringify(order));
        if (!data.retorno.erros) {
          const index = dates.findIndex((d) => d.data === order.pedido.data);
          if (index >= 0) {
            dates[index] = {
              data: order.pedido.data,
              total_sales:
                dates[index].total_sales + order.pedido.itens.item.vlr_unit,
            };
            return;
          }
          dates = [
            ...dates,
            {
              data: order.pedido.data,
              total_sales: order.pedido.itens.item.vlr_unit,
            },
          ];
        }
      })
    );
    await Promise.all(
      dates.map(async (d) => {
        const sale = await SalesModel.findOne({ data: d.data }).exec();
        if (sale) {
          await SalesModel.updateOne(
            { data: d.data },
            { total_sales: sale.total_sales + d.total_sales }
          );
          return;
        }
        await SalesModel.updateOne(
          { data: d.data },
          { total_sales: d.total_sales },
          { upsert: true }
        );
      })
    );

    res.json({ success: true });
  }
}

export const consolidadosController = new ConsolidadosController();
