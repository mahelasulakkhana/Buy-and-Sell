import Hapi from "@hapi/hapi";
import routes from "./routes";
import { db } from "./database";

let server;

const start = async () => {
  server = Hapi.server({
    port: 8000,
    host: "localhost",
  });

  routes.forEach((route) => server.route(route));

  db.connect();

  await server.start();
  console.log(`Server is listening on ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

process.on("SIGINT", async () => {
  try {
    console.log("Stopping server...");
    await server.stop({ timeout: 10000 });
    db.end();
    console.log("Server stopped");
    process.exit(0);
  } catch (err) {
    console.error("Error during shutdown", err);
    process.exit(1);
  }
});

start();
