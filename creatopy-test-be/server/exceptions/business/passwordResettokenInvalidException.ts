import Constants from "../../utils/constants";
import BaseException from "../baseException";
import Types from "../types";

class PasswordResetTokenInvalidException extends BaseException {
  exceptionType: string;
  constructor(message?: string) {
    super(message || "Password reset token is invalid or has expired.", Constants.StatusCodes.UnauthorizedAceess);
    this.exceptionType = Types.BUSINESS;
  }
}

export default PasswordResetTokenInvalidException;