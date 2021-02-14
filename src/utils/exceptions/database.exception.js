const { ErrorResponse } = require("../errorResponses.utils");

class DatabaseException extends Error {
    constructor(code, message, data, status=404) {
        super(message);
        this.message = "Database Error: " + message;
        this.name = "Database Error";
      	this.code = code;
        this.error = this.constructor.name;
        this.status = status;
        this.data = data;
    }
}

class NotFoundException extends DatabaseException {
    constructor(message,data){
    	super(ErrorResponse.NotFoundException, message, data);
    }
}

class DuplicateEntryException extends DatabaseException {
    constructor(message,data){
    	super(ErrorResponse.DuplicateEntryException, message, data, 409);
    }
}

class UpdateFailedException extends DatabaseException {
    constructor(message,data){
    	super(ErrorResponse.UpdateFailedException, message, data, 500);
    }
}

class CreateFailedException extends DatabaseException {
    constructor(message,data){
    	super(ErrorResponse.CreateFailedException, message, data, 500);
    }
}

class UnexpectedException extends DatabaseException {
    constructor(message = "Something went wrong",data){
    	super(ErrorResponse.UnexpectedException, message, data);
    }
}

module.exports = { 
    NotFoundException,
    DuplicateEntryException,
    UnexpectedException,
    UpdateFailedException,
    CreateFailedException 
};