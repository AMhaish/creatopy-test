// tslint:disable: comment-format
import { Application } from "express";
import { Container, IInstanceWrapper } from "addict-ioc";
import Middlewares from "../middlewares";
import AuthorizationMiddleware from "../middlewares/authorizationMiddleware";
import DefaultMiddleware from "../middlewares/defaultMiddleware";

const middlewaresConf: any = {
  init(app: Application, ioc: Container<IInstanceWrapper<any>>): void {

    // Order of middlewares is so important
    // Injecting default middleware (Should be first so others can read body)
    initializeDefaultMiddleware(app, ioc);

    // Injecting passport middleware
    initializePassportMiddleware(app, ioc);

    // Injecting authorization middleware
    initializeAuthorizationMiddleware(app, ioc);

  }
};

function initializeDefaultMiddleware(app: Application, ioc: Container<IInstanceWrapper<any>>): void {
  const defaultMiddleware: DefaultMiddleware = ioc.resolve<DefaultMiddleware>(Middlewares.DefaultMiddleware);
  defaultMiddleware.initialize(app);
}

function initializeAuthorizationMiddleware(app: Application, ioc: Container<IInstanceWrapper<any>>): void {
  const authorizationMiddleware: AuthorizationMiddleware = ioc.resolve<AuthorizationMiddleware>(Middlewares.AuthorizationMiddleware);
  authorizationMiddleware.initialize(app);
}


function initializePassportMiddleware(app: Application, ioc: Container<IInstanceWrapper<any>>): void {
  const passportMiddleware: AuthorizationMiddleware = ioc.resolve<AuthorizationMiddleware>(Middlewares.PassportMiddleware);
  passportMiddleware.initialize(app);
}

export default middlewaresConf;