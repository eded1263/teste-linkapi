import { Router } from "express";

class ConsolidadosController {
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/consolidados", this.getConsolidados);
  }

  getConsolidados(_req, res) {
    res.json({});
  }
}

export const consolidadosController = new ConsolidadosController();
