class ValidationException extends Error {
    constructor (message, data) {
        super(message);
        this.message = "Validation Error: " + message;
        this.name = "Validation Error";
        this.error = this.constructor.name;
        this.status = 400;
        this.data = data;
    }
}

class InvalidPropertiesException extends ValidationException {
    constructor (message, data){
        super(message, data);
    }
}

module.exports = { InvalidPropertiesException };