import BaseRequestValidator from './baseRequestValidator';

class IncomingMessageRequestValidator extends BaseRequestValidator {
    constructor(request: any) {
        super(request);
    }

    validate() {
        this.isEmpty('from');
        this.isEmpty('id');
        this.isEmpty('timestamp');
        this.isEmpty('type');
        if (this.request?.data?.type === "text") this.isSubEmpty('body', 'text')
        if (this.request?.data?.type === "image") this.isSubEmpty('id', 'image');
        this.finalizeValidate();
    }
}

export default IncomingMessageRequestValidator;