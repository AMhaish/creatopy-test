import Constants from "../../utils/constants";
import BaseException from "../baseException";
import Types from "../types";

class InvalidParametersException extends BaseException {
  exceptionType: string;
  constructor(message?: string) {
    // Providing default message and overriding status code.
    super(message || "Invalid request parameters", Constants.StatusCodes.GeneralError);
    this.exceptionType = Types.PARAMETER_VALIDATION;
  }
}

export default InvalidParametersException;
