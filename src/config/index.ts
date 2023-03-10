const dotenv = require("dotenv");

dotenv.config();

const config = {
  httpPort: process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT, 10) : 3000,
  auth: {
    secret: process.env.AUTH_SECRET || "",
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT
      ? parseInt(process.env.DATABASE_PORT, 10)
      : 3306,
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
  amqp: {
    host: process.env.AMQP_HOST,
    port: process.env.AMQP_PORT ? parseInt(process.env.AMQP_PORT, 10) : 5672,
    queues: {
      finishedTasks: process.env.AMQP_FINISHED_TASKS_QUEUE,
    },
  },
};

export default config;
