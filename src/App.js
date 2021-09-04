import express from "express";

export class App {
  app = express();

  constructor(controllers) {
    this.initializeControllers(controllers);
    this.notFoundMiddleware();
  }

  initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }
  notFoundMiddleware() {
    this.app.use((_, res) =>
      res.status(404).json({ status: 404, message: "URL não encontrada" })
    );
  }
}
