import LoggingService from "../services/loggingService";
import express from "./express";
import graphql from "./graphql";
import { Container, IInstanceWrapper } from "addict-ioc";
import { Application } from "express";
import { Server } from "http";

function routes(httpServer: Server, app: Application, ioc: Container<IInstanceWrapper<any>>, logger: LoggingService): void {
  graphql(httpServer, app, ioc, logger);
  express(httpServer, app, ioc, logger);
}
export default routes;