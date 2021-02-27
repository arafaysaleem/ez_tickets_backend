const { InternalServerException } = require('../utils/exceptions/api.exception');
const { TokenVerificationException } = require('../utils/exceptions/auth.exception');

function errorMiddleware (err, req, res, next) {
    if (err.status === 500 || !err.message) {
        if (!err.isOperational) err = new InternalServerException('Internal server error');
    } else if (err.name === "JsonWebTokenError") err = new TokenVerificationException();

    let { message, code, error, status, data, stack} = err;

    console.log(`[Exception] ${error}, [Code] ${code}`);
    console.log(`[Error] ${message}`);
    console.log(`[Stack] ${stack}`);

    const headers = {
        success: "0",
        error,
        code,
        // status,
        message,
        ...(data) && data
    };

    res.status(status).send({headers, body: {}});
}

module.exports = errorMiddleware;