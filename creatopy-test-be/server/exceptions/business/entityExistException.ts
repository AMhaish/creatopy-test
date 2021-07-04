import Constants from "../../utils/constants";
import BaseException from "../baseException";
import Types from "../types";

class EntityExistException extends BaseException {
  exceptionType: string;
  constructor(message?: string) {
    // Providing default message and overriding status code.
    super(message || "Entity Exist", Constants.StatusCodes.EntityExistException);
    this.exceptionType = Types.BUSINESS;
  }
};

export default EntityExistException;