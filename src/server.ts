import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { Container } from "./container";
import config from "./config";

export interface GraphQLContext {
  container: Container;
}

async function startServer(container: Container) {
  const app = express();

  const httpServer = http.createServer(app);

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: config.httpPort }, resolve)
  );

  console.log(`🚀 Server ready at http://localhost:${config.httpPort}/`);
}

export default startServer;
