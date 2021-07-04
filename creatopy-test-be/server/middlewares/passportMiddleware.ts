
const bCrypt = require("bcrypt-nodejs");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
import passport from "passport";
import PassportStrategies from "../config/passport-strategies";
const LocalStrategy = require("passport-local").Strategy;
import Constants from "../utils/constants";
import { Application } from "express";
import UserService from "../services/userService";
import User from "../models/user";

const { SESSION_KEY } = process.env;

class PassportMiddleware {
  constructor(
    private userService: UserService
  ) { }

  initialize(app: Application): void {
    passport.serializeUser((user: any, done) => {
      done(null, user.id);
    });
    passport.deserializeUser((id: string, done) => {
      this.userService.getUser(id).then(function (user: User): void {
        if (user) {
          done(null, user);
        }
      });
    });
    this.initializeTokenAuthStrategy();
    this.initializeRegistrationStrategy();
    this.initializeLoginStrategy();
    app.use(passport.initialize());
  }

  initializeTokenAuthStrategy(): void {
    passport.use(PassportStrategies.Token,
      new JWTStrategy(
        {
          jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
          secretOrKey: SESSION_KEY,
        },
        (jwtPayload: any, cb: any) => {
          this.userService.getUser(jwtPayload.id).then((user: User) => {
            return cb(null, user);
          }).catch((error) => {
            return cb(error);
          });
        }
      )
    );
  }

  initializeRegistrationStrategy(): void {
    passport.use(PassportStrategies.Signup, new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      }, (req: any, email: string, password: string, done: any) => {
        this.userService.getUserByEmail(email).then((user) => {
          if (user) {
            return done(null, false, {
              error: "Email already exist",
              statusCode: Constants.StatusCodes.EntityExistException,
            });
          } else {
            let user: User = {
              email: email,
              password: password,
              resetPassToken: "",
            };
            this.userService.createUser(user).then(function (newUser: User): void {
              if (!newUser) {
                return done(null, false);
              }
              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        }).catch((ex) => {
          return done(null, false, {
            error: "Error in creating your user, please try again:" + ex.message,
            statusCode: Constants.StatusCodes.GeneralError,
          });
        });
      }
    )
    );
  }

  initializeLoginStrategy(): void {
    passport.use(PassportStrategies.Signin,
      new LocalStrategy(
        {
          // by default, local strategy uses username and password, we will override with email
          usernameField: "email",
          passwordField: "password",
          passReqToCallback: true, // allows us to pass back the entire request to the callback
        },
        async (req: any, email: string, password: string, done: any) => {
          // var user = User;
          let isValidPassword: any = function (userpass: string, password: string) {
            let result: boolean = bCrypt.compareSync(password, userpass);
            return result;
          };
          this.userService.getUserByEmail(email).then((user) => {
            if (!user) {
              return done(null, false, {
                error: "Email doesn't exists",
                statusCode: Constants.StatusCodes.UnauthorizedAceess,
              });
            } else if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                error: "Incorrect password",
                statusCode: Constants.StatusCodes.UnauthorizedAceess,
              });
            } else {
              return done(null, user);
            }
          }).catch((error) => {
            return done(null, false, { error: error.message, statusCode: Constants.StatusCodes.GeneralError });
          });
        }
      )
    );
  }
}

export default PassportMiddleware;