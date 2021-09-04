import "./src/config/dotenv";
import { client } from "./src/config/mongodb";
import { App } from "./src/App";
import { createServer } from "http";
import { consolidadosController } from "./src/api/consolidados/controller/consolidados";

(async () => {
  await client.connect();
  const application = new App([consolidadosController]);
  const server = createServer(application.app);
  server.listen(process.env.PORT);
  server.on("listening", () => {
    console.log(`API is running at port: ${process.env.PORT}`);
  });
})();
