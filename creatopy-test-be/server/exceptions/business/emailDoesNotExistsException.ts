import Constants from "../../utils/constants";
import BaseException from "../baseException";
import Types from "../types";

class EmailDoesNotExistsException extends BaseException {
  exceptionType: string;
  constructor(message: string) {
    let m = message || "This email does not exist in the system";
    // Providing default message and overriding status code.
    super(message || "This email does not exist in the system", Constants.StatusCodes.NotFound);
    this.exceptionType = Types.BUSINESS;
  }
};

export default EmailDoesNotExistsException;
