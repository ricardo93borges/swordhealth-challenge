import startServer from "./server";
import { initializeContainer } from "./container";
import { Database } from "./database";

async function run() {
  const database = new Database();
  await database.connect();

  const container = initializeContainer(database.getDataSource());

  startServer(container);
}

run();
