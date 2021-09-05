import express from "express";
import morgan from "morgan";
import swaggerUiExpress from "swagger-ui-express";
import { docsConfiguration } from "./config/docs";

export class App {
  app = express();

  constructor(controllers) {
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.notFoundMiddleware();
  }

  initializeMiddlewares() {
    this.app.use(morgan("dev"));
    this.app.use(
      "/api-docs",
      swaggerUiExpress.serve,
      swaggerUiExpress.setup(docsConfiguration)
    );
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
