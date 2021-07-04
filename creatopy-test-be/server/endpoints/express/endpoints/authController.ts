import PassportStrategies from "../../../config/passport-strategies";
import passport from "passport";
import User from "../../../models/user";
import EmailService from "../../../services/emailService";
import UserService from "../../../services/userService";
import Constants from "../../../utils/constants";
import Limits from "../../../config/limits";
import EmailDoesNotExistsException from "../../../exceptions/business/emailDoesNotExistsException";
import InvalidParametersException from "../../../exceptions/parameter-validation/invalidParametersException";
import jwt, { Secret } from "jsonwebtoken";
import autoBind from "auto-bind";

const { SESSION_KEY, SERVER_FRONTEND } = process.env;

class AuthController {
  constructor(private userService: UserService, private emailService: EmailService) {
    autoBind(this);
  }

  async signin(req: any, res: any, next: any): Promise<void> {
    await passport.authenticate(PassportStrategies.Signin, { session: false }, async (generalError: any, user: any, info: any) => {
      if (generalError) {
        return res.status(Constants.StatusCodes.GeneralError).json({
          message: generalError,
        });
      } else {
        if (info) {
          return res.status(info.statusCode ? info.statusCode : Constants.StatusCodes.GeneralError).json({
            message: info.error,
            user: user,
          });
        } else {
          const token: string = jwt.sign(user, SESSION_KEY as Secret, { expiresIn: Limits.TokenExpiresIn });
          return res.status(Constants.StatusCodes.Success).json({ user, token });
        }
      }
    })(req, res, next);
  }

  async signup(req: any, res: any, next: any): Promise<void> {
    passport.authenticate(PassportStrategies.Signup, (generalError: any, user: any, info: any) => {
      if (generalError) {
        return res.status(Constants.StatusCodes.GeneralError).json({
          message: generalError,
        });
      } else {
        if (info) {
          return res.status(info.statusCode ? info.statusCode : Constants.StatusCodes.GeneralError).json({
            message: info.error,
            user: user,
          });
        } else {
          const token: string = jwt.sign(user, SESSION_KEY  as Secret, { expiresIn: Limits.TokenExpiresIn });
          return res.status(Constants.StatusCodes.Success).json({ user, token });
        }
      }
    })(req, res, next);
  }

  async forgetPasswordEmail(req: any, res: any): Promise<void> {
    let email: string = req.body.email;
    if (email) {
      const user: User | null = await this.userService.getUserByEmail(email);
      if (!user) {
        throw new EmailDoesNotExistsException(email + " does not exists in our database");
      } else {
        let token: string = await this.userService.generateResetPasswordToken(user);
        const url: string = `${SERVER_FRONTEND}/reset/${token}`;
        this.emailService.sendForgetPasswordEmail(url, user.email);
        return res.status(Constants.StatusCodes.Success).send("SUCCESS");
      }
    } else {
      throw new InvalidParametersException("Email is missing");
    }
  }

  async forgetResetPassword(req: any, res: any): Promise<void> {
    let token: string = req.params.token;
    let password: string = req.body.password;
    if (token && password) {
      let user: User = await this.userService.findUserByForgetPasswordToken(token);
      await this.userService.updateUserPassword(user, password);
      return res.status(Constants.StatusCodes.Success).send("SUCCEEDED AGAIN");
    } else {
      throw new InvalidParametersException("token or password is missing");
    }
  }

}

export default AuthController;
