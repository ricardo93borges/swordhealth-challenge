import express, { Express } from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./config";
import { Container } from "./container";
import TaskRouter from "./routers/task.router";
import UserRouter from "./routers/user.router";
import AuthRouter from "./routers/auth.router";

function setRouters(app: Express, container: Container) {
  const taskRouter = new TaskRouter(container);
  const userRouter = new UserRouter(container);
  const authRouter = new AuthRouter(container);

  app.use("/user", userRouter.getRouter());
  app.use("/task", taskRouter.getRouter());
  app.use("/auth", authRouter.getRouter());

  return app;
}

async function startServer(container: Container) {
  let app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app = setRouters(app, container);

  const httpServer = http.createServer(app);

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: config.httpPort }, resolve)
  );

  console.log(`🚀 Server ready at http://localhost:${config.httpPort}/`);
}

export default startServer;
