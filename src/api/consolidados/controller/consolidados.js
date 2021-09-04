import { Router } from "express";
import { pipedriveService } from "~/src/services/pipedrive";
import { ConsolidadoModel } from "../../../models/consolidado.model";
import { blingService } from "../../../services/bling";
import { dateFormat } from "../../../utils/dateFormat";
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
    const orders = await ConsolidadoModel.aggregate([
      {
        $group: { _id: "$data" },
      },
    ]);
    res.json(orders);
  }

  async postConsolidados(_req, res) {
    const deals = await pipedriveService.getAllWonDeals();
    const orders = orderParser(deals);
    await Promise.all(
      orders.map(async (order) => {
        const { data } = await blingService.saveOrder(JSON.stringify(order));
        if (!data.retorno.erros) {
          await ConsolidadoModel.create(order.pedido);
        }
      })
    );
    res.json(deals);
  }
}

export const consolidadosController = new ConsolidadosController();
