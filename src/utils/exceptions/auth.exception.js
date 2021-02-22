const { ErrorResponse } = require("../errorResponses.utils");

class AuthException extends Error {
    constructor (code, message, data, status = 401) {
        super(message);
        this.message = "Auth Error: " + message;
        this.name = "Auth Error";
        this.code = code;
        this.error = this.constructor.name;
        this.status = status;
        this.data = data;
    }
}

class UnauthorizedException extends AuthException {
    constructor (message = 'User unauthorized for action', data){
        super(ErrorResponse.UnauthorizedException, message, data);
    }
}

class TokenMissingException extends AuthException {
    constructor (message = "Access denied. No token credentials sent", data){
        super(ErrorResponse.TokenMissingException, message, data);
    }
}

class TokenVerificationException extends AuthException {
    constructor (message = "Authentication failed", data){
        super(ErrorResponse.TokenVerificationException, message, data);
    }
}

class OTPGenerationException extends AuthException {
    constructor (message = "OTP generation failed", data){
        super(ErrorResponse.OTPGenerationException, message, data);
    }
}

class OTPExpiredException extends AuthException {
    constructor (message = "OTP expired", data){
        super(ErrorResponse.OTPExpiredException, message, data);
    }
}

class OTPVerificationException extends AuthException {
    constructor (message = "OTP verification failed", data){
        super(ErrorResponse.OTPVerificationException, message, data);
    }
}

class InvalidCredentialsException extends AuthException {
    constructor (message, data){
        super(ErrorResponse.InvalidCredentialsException, message, data);
    }
}

class RegistrationFailedException extends AuthException {
    constructor (message = "User failed to be registered", data){
        super(ErrorResponse.RegistrationFailedException, message, data, 500);
    }
}

module.exports = {
    TokenMissingException,
    InvalidCredentialsException,
    TokenVerificationException,
    UnauthorizedException,
    RegistrationFailedException,
    OTPExpiredException,
    OTPGenerationException,
    OTPVerificationException
};