import startServer from "./server";
import { initializeContainer } from "./container";
import { Database } from "./database";
import { AMQP } from "./amqp/amqp";
import { FinishedTasksConsumer } from "./amqp/consumers/finished-tasks.consumer";

async function run() {
  const database = new Database();
  await database.connect();

  const amqp = new AMQP();

  const container = initializeContainer(database.getDataSource(), amqp);

  startServer(container);

  const finishedTasksConsumer = new FinishedTasksConsumer(amqp);
  finishedTasksConsumer.consume();
}

run();
