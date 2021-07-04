import Constants from "../../utils/constants";
import BaseException from "../baseException";
import Types from "../types";

class ForbiddenException extends BaseException {
  exceptionType: string;
  constructor(message?: string) {
    // Providing default message and overriding status code.
    super(message || "You are not allowed to do that action.", Constants.StatusCodes.ForbiddenError);
    this.exceptionType = Types.PARAMETER_VALIDATION;
  }
}

export default ForbiddenException;
