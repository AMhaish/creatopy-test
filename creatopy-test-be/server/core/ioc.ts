// tslint:disable: comment-format
import { Container, IInstanceWrapper } from 'addict-ioc';

// Class names
import Services from "../services";
import ExpressControllers from "../endpoints/express";
import Middlewares from "../middlewares";
import Repos from "../repositories";

// Services classes imports
import LoggingService from "../services/loggingService";
import EventService from "../services/eventService";
import SubscriptionsService from "../services/subscriptionsService";
import ItemsService from "../services/itemsService";
import UserService from "../services/userService";
import EmailService from '../services/emailService';

// Middleware classes imports
import AuthorizationMiddleware from "../middlewares/authorizationMiddleware";
import DefaultMiddleware from "../middlewares/defaultMiddleware";
import PassportMiddleware from "../middlewares/passportMiddleware";

// Controllers classes imports
import AuthController from "../endpoints/express/endpoints/authController";

// Repo classes imports
import ItemsRepo from "../repositories/itemsRepo";
import UsersRepo from "../repositories/usersRepo";


const settings: any = {
  isSingleton: false,
  isFactory: false,
};
var container: Container<IInstanceWrapper<any>>;
export default () => {
  if (!container) {
    container = new Container(settings);

    // Registering Repos
    container.register(Repos.ItemsRepo, ItemsRepo).singleton();
    container.register(Repos.UsersRepo, UsersRepo).singleton();

    // Registering Services
    container.register(Services.LoggingService, LoggingService);
    container.register(Services.EmailService, EmailService).dependencies(Services.LoggingService).singleton();
    container.register(Services.EventService, EventService).dependencies(Services.LoggingService).singleton();
    container.register(Services.SubscriptionsService, SubscriptionsService)
      .dependencies(Services.EventService).singleton();
    container.register(Services.ItemsService, ItemsService).dependencies(Services.LoggingService, Repos.ItemsRepo).singleton();
    container.register(Services.UserService, UserService).dependencies(Services.LoggingService, Repos.UsersRepo).singleton();

    // Registering Middleware
    container.register(Middlewares.DefaultMiddleware, DefaultMiddleware).singleton();
    container.register(Middlewares.PassportMiddleware, PassportMiddleware).dependencies(Services.UserService).singleton();
    container.register(Middlewares.AuthorizationMiddleware, AuthorizationMiddleware).singleton();

    // Registering Controllers
    container.register(ExpressControllers.AuthController, AuthController).dependencies(Services.UserService, Services.EmailService).singleton();
  }
  return container;
};

