import connectDatabase from "./mongodb";
import startServer from "./server";
import container from "./container";

async function run() {
  await connectDatabase();
  startServer(container);
}

run();
