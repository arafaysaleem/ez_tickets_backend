const { ErrorResponse } = require("../errorResponses.utils");

class ApiException extends Error {
    constructor(code, message, data, status=401) {
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
    constructor(message,data){
    	super(ErrorResponse.InternalServerException, message, data, 500);
    }
}

class UnauthorizedException extends ApiException {
    constructor(message='User unauthorized for action',data){
    	super(ErrorResponse.UnauthorizedException, message, data);
    }
}

class TokenMissingException extends ApiException {
    constructor(message = "Access denied. No token credentials sent",data){
    	super(ErrorResponse.TokenMissingException, message, data);
    }
}

class TokenVerificationException extends ApiException {
    constructor(message = "Authentication failed",data){
    	super(ErrorResponse.TokenVerificationException, message, data);
    }
}

class InvalidCredentialsException extends ApiException {
    constructor(message,data){
    	super(ErrorResponse.InvalidCredentialsException, message, data);
    }
}

class RegistrationFailedException extends ApiException {
    constructor(message = "User failed to be registered",data){
    	super(ErrorResponse.RegistrationFailedException, message, data, 500);
    }
}

class InvalidEndpointException extends ApiException {
    constructor(message = "Endpoint Not Found",data){
    	super(ErrorResponse.InvalidEndpointException, message, data, 404);
    }
}

module.exports = { 
    InternalServerException,
    UnauthorizedException,
    TokenMissingException,
    TokenVerificationException,
    InvalidCredentialsException,
    RegistrationFailedException,
    InvalidEndpointException
};