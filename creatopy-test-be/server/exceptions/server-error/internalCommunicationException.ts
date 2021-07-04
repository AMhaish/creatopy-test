import Constants from "../../utils/constants";
import BaseException from "../baseException";
import Types from "../types";

class InternalCommunicationException extends BaseException {
  exceptionType: string;
  constructor(message?: string) {
    // Providing default message and overriding status code.
    super("Internal communication error: " + message, Constants.StatusCodes.ServiceUnavailable);
    this.exceptionType = Types.SERVER_ERROR;
  }
}

export default InternalCommunicationException;
