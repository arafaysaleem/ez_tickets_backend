const { ErrorStatusCodes } = require("../errorStatusCodes.utils");

class AuthException extends Error {
    constructor (message, data, status = 401) {
        super(message);
        this.message = "Auth Error: " + message;
        this.name = "Auth Error";
        this.error = this.constructor.name;
        this.status = status;
        this.data = data;
    }
}

class UnauthorizedException extends AuthException {
    constructor (message = 'User unauthorized for action', data){
        super(message, data);
    }
}

class TokenMissingException extends AuthException {
    constructor (message = "Access denied. No token credentials sent", data){
        super(message, data);
    }
}

class TokenVerificationException extends AuthException {
    constructor (message = "Authentication failed", data){
        super(message, data);
    }
}

class TokenExpiredException extends AuthException {
    constructor (message = "JWT expired", data){
        super(message, data);
    }
}

class OTPGenerationException extends AuthException {
    constructor (message = "OTP generation failed", data){
        super(message, data);
    }
}

class OTPExpiredException extends AuthException {
    constructor (message = "OTP expired", data){
        super(message, data);
    }
}

class OTPVerificationException extends AuthException {
    constructor (message = "OTP verification failed", data){
        super(message, data);
    }
}

class InvalidCredentialsException extends AuthException {
    constructor (message, data){
        super(message, data);
    }
}

class RegistrationFailedException extends AuthException {
    constructor (message = "User failed to be registered", data){
        super(message, data, ErrorStatusCodes.RegistrationFailedException);
    }
}

module.exports = {
    TokenMissingException,
    InvalidCredentialsException,
    TokenVerificationException,
    TokenExpiredException,
    UnauthorizedException,
    RegistrationFailedException,
    OTPExpiredException,
    OTPGenerationException,
    OTPVerificationException
};