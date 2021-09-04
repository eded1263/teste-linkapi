import "./src/config/dotenv";
import { client } from "./src/config/mongodb";
import { App } from "./src/App";
import { createServer } from "http";

(async () => {
  await client.connect();
  const application = new App([]);
  const server = createServer(application.app);
  server.listen(process.env.PORT);
  server.on("listening", () => {
    console.log(`API is running at port: ${process.env.PORT}`);
  });
})();
