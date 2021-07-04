// tslint:disable: comment-format
import express from "express";
import * as http from "http";
import Services from "../services";
import iocContainer from "./ioc";
import routes from "../routes";
import { Application } from "express";
import { Container, IInstanceWrapper } from "addict-ioc";
import middlewaresInitializer from "./middlewares-initializer";
import dbSync from "./sync-db";
import LoggingService from "../services/loggingService";

const app: Application = express();
const httpServer: http.Server = http.createServer(app);
const ioc: Container<IInstanceWrapper<any>> = iocContainer();
var server: any;
const serverConf: any = {
  async start({ port = "8000", disableMiddlewares = false }: { port: string | undefined, disableMiddlewares: boolean }): Promise<void> {

    const logger: LoggingService = ioc.resolve(Services.LoggingService);

    // Syncing database
    dbSync.sync(logger);

    // Configure Pre routes middlewares
    if (!disableMiddlewares) {
      middlewaresInitializer.init(app, ioc);
    }

    // Configure the routes
    routes(httpServer, app, ioc, logger);

    server = httpServer.listen(port);
  },
  stop(): void {
    server.close();
  }
}

export default serverConf;