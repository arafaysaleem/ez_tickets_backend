const { Config } = require("../../configs/config");
const { ErrorCodes } = require("../errorCodes.utils");
class ValidationException extends Error {
    constructor (code, message, data) {
        super(message);
        if (Config.NODE_ENV === "dev") this.message = "Validation Error: " + message;
        else this.message = message;
        this.name = "Validation Error";
        this.code = code;
        this.error = this.constructor.name;
        this.status = 400;
        this.data = data;
    }
}

class InvalidPropertiesException extends ValidationException {
    constructor (message, data){
        super(ErrorCodes.InvalidPropertiesException, message, data);
    }
}

module.exports = { InvalidPropertiesException };