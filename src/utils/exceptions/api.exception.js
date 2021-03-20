const { ErrorStatusCodes } = require("../errorStatusCodes.utils");

class ApiException extends Error {
    constructor (message, data, status = 401) {
        super(message);
        this.message = "Api Error: " + message;
        this.name = "Api Error";
        this.error = this.constructor.name;
        this.status = status;
        this.data = data;
    }
}

class InternalServerException extends ApiException {
    constructor (message, data){
        super(message, data, ErrorStatusCodes.InternalServerException);
    }
}

class InvalidEndpointException extends ApiException {
    constructor (message = "Endpoint Not Found", data){
        super(message, data, ErrorStatusCodes.InvalidEndpointException);
    }
}

class UnimplementedException extends ApiException {
    constructor (message = "API unimplemented", data){
        super(message, data, ErrorStatusCodes.UnimplementedException);
    }
}

module.exports = {
    InternalServerException,
    InvalidEndpointException,
    UnimplementedException
};