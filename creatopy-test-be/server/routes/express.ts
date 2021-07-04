import { Container, IInstanceWrapper } from "addict-ioc";
import { Application } from 'express';
import { Server } from 'http';
import Controllers from "../endpoints/express";
import AuthController from "../endpoints/express/endpoints/authController";
import LoggingService from "../services/loggingService";
import helpers from "./helpers";

export default (httpServer: Server, app: Application, ioc: Container<IInstanceWrapper<any>>, logger: LoggingService) => {
  const authController: AuthController = ioc.resolve(Controllers.AuthController);

  app.post("/auth/signin", async (req, res, next) => {
    await helpers.handleException(logger, req, res, next, authController.signin);
  });
  app.post("/auth/signup", async (req, res, next) => {
    await helpers.handleException(logger, req, res, next, authController.signup);
  });
  app.post("/auth/forgot", async (req, res, next) => {
    await helpers.handleException(logger, req, res, next, authController.forgetPasswordEmail);
  });
  app.post("/auth/reset/:token", async (req, res, next) => {
    await helpers.handleException(logger, req, res, next, authController.forgetResetPassword);
  });
  logger.logInfo(`Running an Express API server at /auth/*`, "Express routes");
};