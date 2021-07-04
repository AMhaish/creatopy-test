import Constants from "../../utils/constants";
import BaseException from "../baseException";
import Types from "../types";

class NeedAuthException extends BaseException {
  exceptionType: string;
  constructor(message?: string) {
    // Providing default message and overriding status code.
    super(message || "You have to login before accessing this resource.", Constants.StatusCodes.UnauthorizedAceess);
    this.exceptionType = Types.PARAMETER_VALIDATION;
  }
}

export default NeedAuthException;
