import express from "express";

export class App {
  app = express();

  constructor(controllers) {
    this.initializeControllers(controllers);
  }

  initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }
}
