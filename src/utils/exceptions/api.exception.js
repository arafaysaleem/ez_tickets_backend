const { ErrorResponse } = require("../errorResponses.utils");

class ApiException extends Error {
    constructor (code, message, data, status = 401) {
        super(message);
        this.message = "Api Error: " + message;
        this.name = "Api Error";
        this.code = code;
        this.error = this.constructor.name;
        this.status = status;
        this.data = data;
    }
}

class InternalServerException extends ApiException {
    constructor (message, data){
        super(ErrorResponse.InternalServerException, message, data, 500);
    }
}

class InvalidEndpointException extends ApiException {
    constructor (message = "Endpoint Not Found", data){
        super(ErrorResponse.InvalidEndpointException, message, data, 404);
    }
}

class UnimplementedException extends ApiException {
    constructor (message = "API unimplemented", data){
        super(ErrorResponse.UnimplementedException, message, data, 404);
    }
}

module.exports = {
    InternalServerException,
    InvalidEndpointException,
    UnimplementedException
};