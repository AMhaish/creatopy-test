import validator from "validator";
import InvalidParametersException from "../../../exceptions/parameter-validation/invalidParametersException";
class BaseRequestValidator {
  validationErrors: string[] = [];
  request: any;
  constructor(request: any) {
    this.request = request;
  }

  finalizeValidate() {
    if (this.validationErrors.length > 0) {
      throw new InvalidParametersException(this.validationErrors.join(","));
    }
  }

  isEmpty(propName: string) {
    if (this.request.body[propName] == undefined || validator.isEmpty(this.request.body[propName])) {
      this.validationErrors.push(propName + " field is empty.");
    }
  }

  isArray(propName: string) {
    if (this.request.body[propName] == undefined || !Array.isArray(this.request.body[propName])) {
      this.validationErrors.push(propName + " is not an array");
    }
  }

  isSubEmpty(subObject: string, propName: string) {
    if (this.request.body[propName] == undefined || validator.isEmpty(this.request.body[subObject][propName])) {
      this.validationErrors.push(propName + " field is empty.");
    }
  }

  isNumeric(propName: string) {
    if (this.request.body[propName] == undefined || !validator.isNumeric(this.request.body[propName])) {
      this.validationErrors.push(propName + " field is not numeric.");
    }
  }

  isEmptyQuery(propName: string) {
    if (this.request.body[propName] == undefined || validator.isEmpty(this.request.query[propName])) {
      this.validationErrors.push(propName + " query string is empty.");
    }
  }

  isNumericQuery(propName: string) {
    if (this.request.body[propName] == undefined || !validator.isNumeric(this.request.query[propName])) {
      this.validationErrors.push(propName + " query string is not numeric.");
    }
  }
};
export default BaseRequestValidator;