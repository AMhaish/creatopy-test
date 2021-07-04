import Constants from "../../utils/constants";
import BaseException from "../baseException";
import Types from "../types";

class NotImplementedException extends BaseException {
  exceptionType: string;
  constructor(message?: string) {
    // Providing default message and overriding status code.
    super(message || "Not implemented exception.", Constants.StatusCodes.GeneralError);
    this.exceptionType = Types.BUSINESS;
  }
}

export default NotImplementedException;
