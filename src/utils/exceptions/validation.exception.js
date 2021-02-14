const { ErrorResponse } = require("../errorResponses.utils");

class ValidationException extends Error {
    constructor(code, message, data) {
        super(message);
        this.message = "Validation Error: " + message;
        this.name = "Validation Error";
      	this.code = code;
        this.error = this.constructor.name;
        this.status = 400;
        this.data = data;
    }
}

class InvalidPropertiesException extends ValidationException {
    constructor(message,data){
    	super(ErrorResponse.InvalidPropertiesException, message, data);
    }
}

module.exports = { InvalidPropertiesException };