import passport from "passport";
import NeedAuthException from "../exceptions/parameter-validation/needAuthException";
const gql = require("graphql-tag");
import { Application } from "express";
import PassportStrategies from "../config/passport-strategies";
import User from "../models/user";
import Constants from "../utils/constants";

class AuthorizationMiddleware {
  constructor() {
    this.middlewareFunction = this.middlewareFunction.bind(this);
    this.authenticateUser = this.authenticateUser.bind(this);
  }

  initialize(app: Application): void {
    app.use(this.middlewareFunction);
  }

  middlewareFunction(req: any, res: any, next: any): void {
    let level: string = this.resolveRequestLevel(req);
    req.accessLevel = level;
    if (level === Constants.RequestsLevels.Authenticated) {
      this.authenticateUser(req, res, next, (req: any, res: any, next: any) => {
        next();
      });
    } else {
      next();
    }
  }

  resolveRequestLevel(req: any): string {
    if (req.path === "/graphql") {
      let parsedQuery: any = gql`${req.body.query}`;
      let queryOrMutationName: string = parsedQuery.definitions[0].selectionSet.selections[0].name.value;
      switch (queryOrMutationName) {
        case "addItem":
          return Constants.RequestsLevels.Authenticated;
        case "__schema":
          return Constants.RequestsLevels.Anonymous;
        default:
          return Constants.RequestsLevels.Authenticated;
      }
    }
    return Constants.RequestsLevels.Anonymous;
  }

  resolveUserId(req: any): string | null {
    if (req && req.user) {
      return req.user.id;
    }
    return null;
  }

  authenticateUser(req: any, res: any, next: any, callback: any): void {
    passport.authenticate(PassportStrategies.Token, { session: false }, (err: any, user: User) => {
      if (!user) {
        throw new NeedAuthException();
      }
      if (user) {
        req.user = user;
      }
      if (callback) {
        callback(req, res, next);
      }
    })(req, res, next);
  }
}

export default AuthorizationMiddleware;
