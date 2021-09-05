import { Router } from "express";
import { pipedriveService } from "~/src/services/pipedrive";
import { SalesModel } from "../../../models/sales.model";
import { blingService } from "../../../services/bling";
import { orderParser } from "../../../utils/orderParser";
class SalesController {
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/sales", this.getSales);
    this.router.post("/sales", this.postSales);
  }

  async getSales(_req, res) {
    const orders = await SalesModel.find().select("data total_sales");
    res.json(orders);
  }

  async postSales(_req, res) {
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
        const saleObj = new SalesModel({
          data: d.data,
          total_sales: d.total_sales,
        });
        await saleObj.save();
      })
    );

    res.json({ success: true });
  }
}

export const salesController = new SalesController();
