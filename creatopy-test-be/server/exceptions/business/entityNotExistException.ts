import Constants from "../../utils/constants";
import BaseException from "../baseException";
import Types from "../types";

class EntityNotExistException extends BaseException {
  exceptionType: string;
  constructor(message?: string) {
    // Providing default message and overriding status code.
    super(message || "Entity Not Exist", Constants.StatusCodes.NotFound);
    this.exceptionType = Types.BUSINESS;
  }
};

export default EntityNotExistException;