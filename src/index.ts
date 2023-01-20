import startServer from "./server";
import container from "./container";
import { connectDatabase } from "./database";

async function run() {
  await connectDatabase();
  startServer(container);
}

run();
