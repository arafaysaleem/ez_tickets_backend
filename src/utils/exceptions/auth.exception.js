const { ErrorStatusCodes } = require("../errorStatusCodes.utils");
const { ErrorCodes } = require("../errorCodes.utils");
const { Config } = require("../../configs/config");

class AuthException extends Error {
    constructor (code, message, data, status = 401) {
        super(message);
        if (Config.NODE_ENV === "dev") this.message = "Auth Error: " + message;
        else this.message = message;
        this.name = "Auth Error";
        this.code = code;
        this.error = this.constructor.name;
        this.status = status;
        this.data = data;
    }
}

class UnauthorizedException extends AuthException {
    constructor (message = 'User unauthorized for action', data){
        super(ErrorCodes.UnauthorizedException, message, data);
    }
}

class TokenMissingException extends AuthException {
    constructor (message = "Access denied. No token credentials sent", data){
        super(ErrorCodes.TokenMissingException, message, data);
    }
}

class TokenVerificationException extends AuthException {
    constructor (message = "Authentication failed", data){
        super(ErrorCodes.TokenVerificationException, message, data);
    }
}

class TokenExpiredException extends AuthException {
    constructor (message = "JWT expired", data){
        super(ErrorCodes.TokenExpiredException, message, data);
    }
}

class OTPGenerationException extends AuthException {
    constructor (message = "OTP generation failed", data){
        super(ErrorCodes.OTPGenerationException, message, data);
    }
}

class OTPExpiredException extends AuthException {
    constructor (message = "OTP expired", data){
        super(ErrorCodes.OTPExpiredException, message, data);
    }
}

class OTPVerificationException extends AuthException {
    constructor (message = "OTP verification failed", data){
        super(ErrorCodes.OTPVerificationException, message, data);
    }
}

class InvalidCredentialsException extends AuthException {
    constructor (message, data){
        super(ErrorCodes.InvalidCredentialsException, message, data);
    }
}

class RegistrationFailedException extends AuthException {
    constructor (message = "User failed to be registered", data){
        super(ErrorCodes.RegistrationFailedException, message, data, ErrorStatusCodes.RegistrationFailedException);
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