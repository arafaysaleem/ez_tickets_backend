const { ErrorStatusCodes } = require("../errorStatusCodes.utils");
const { ErrorCodes } = require("../errorCodes.utils");
const { Config } = require("../../configs/config");

class DatabaseException extends Error {
    constructor (code, message, data, isOperational = false, status = 404) {
        super(message);
        if (Config.NODE_ENV === "dev") this.message = "Database Error: " + message;
        else this.message = message;
        this.name = "Database Error";
        this.code = code;
        this.isOperational = isOperational;
        this.error = this.constructor.name;
        this.status = status;
        this.data = data;
    }
}

class NotFoundException extends DatabaseException {
    constructor (message, data){
        super(ErrorCodes.NotFoundException, message, data, true);
    }
}

class DuplicateEntryException extends DatabaseException {
    constructor (message, data){
        super(ErrorCodes.DuplicateEntryException, message, data, true, ErrorStatusCodes.DuplicateEntryException);
    }
}

class ForeignKeyViolationException extends DatabaseException {
    constructor (message, data){
        super(ErrorCodes.ForeignKeyViolationException, message, data, true, ErrorStatusCodes.ForeignKeyViolationException);
    }
}

class UpdateFailedException extends DatabaseException {
    constructor (message, data){
        super(ErrorCodes.UpdateFailedException, message, data, true, ErrorStatusCodes.UpdateFailedException);
    }
}

class CreateFailedException extends DatabaseException {
    constructor (message, data){
        super(ErrorCodes.CreateFailedException, message, data, true, ErrorStatusCodes.CreateFailedException);
    }
}

class UnexpectedException extends DatabaseException {
    constructor (message = "Something went wrong", data){
        super(ErrorCodes.UnexpectedException, message, data);
    }
}

module.exports = {
    NotFoundException,
    DuplicateEntryException,
    ForeignKeyViolationException,
    UnexpectedException,
    UpdateFailedException,
    CreateFailedException
};