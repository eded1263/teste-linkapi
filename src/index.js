import "./config/dotenv";
import mongoose from "mongoose";
import { App } from "./App";
import { createServer } from "http";
import { consolidadosController } from "./api/consolidados/controller/consolidados";

(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    connectTimeoutMS: 10000,
  });

  const application = new App([consolidadosController]);
  const server = createServer(application.app);
  server.listen(process.env.PORT);
  server.on("listening", () => {
    console.log(`API is running at port: ${process.env.PORT}`);
  });
})();
