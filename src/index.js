import "core-js/stable";
import "regenerator-runtime/runtime";
import "./config/dotenv";
import mongoose from "mongoose";
import { App } from "./App";
import { createServer } from "http";
import { salesController } from "./api/sales/controller/sales";

(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    connectTimeoutMS: 10000,
  });

  const application = new App([salesController]);
  const server = createServer(application.app);
  server.listen(process.env.PORT);
  server.on("listening", () => {
    console.log(`API is running at port: ${process.env.PORT}`);
  });
})();
