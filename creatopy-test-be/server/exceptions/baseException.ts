import Constants from "../utils/constants";

class BaseException extends Error {
    status: number;
    message: string;
    userMessage: string;
    type: string;
    traceId: string;
    source: string;

    constructor(message: string, status: number, ex?: any) {
        // Calling parent constructor of base Error class.
        super(message);
        // Saving class name in the property of our custom error as a shortcut.
        this.name = this.constructor.name;
        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
        // Defining the properties
        this.status = status || Constants.StatusCodes.GeneralError;

        this.type = '';
        this.traceId = '';
        this.source = '';

        if (ex) {
            if (ex.message && ex.stack) {
                this.message = ex.message + '\n' + ex.stack;
                this.source = (ex.stack != undefined && ex.stack.length > 0 ? ex.stack[0] : 'Unknown');
            } else {
                this.message = ex;
            }
        } else {
            this.message = message;
        }
        this.userMessage = message;

    }

    setTraceId = (traceId: string) => {
        this.traceId = traceId;
    }
    /**
     * Converting the error to JSON to be returned to Front
     */
    toJson = () => {
        return JSON.stringify({
            code: this.status,
            exceptionType: this.type,
            message: this.message,
            userMessage: this.userMessage,
            traceId: this.traceId
        });
    }
}

export default BaseException;