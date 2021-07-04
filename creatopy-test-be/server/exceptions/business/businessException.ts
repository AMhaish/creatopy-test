import Constants from "../../utils/constants";
import BaseException from "../baseException";
import Types from "../types";

class BusinessException extends BaseException {
  exceptionType: string;
  constructor(message?: string) {
    // Providing default message and overriding status code.
    super(message || "Business exception happened", Constants.StatusCodes.GeneralError);
    this.exceptionType = Types.BUSINESS;
  }
};

export default BusinessException;