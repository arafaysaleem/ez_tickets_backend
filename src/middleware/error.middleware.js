const { InternalServerException } = require('../utils/exceptions/api.exception')
const { DuplicateEntryException } = require('../utils/exceptions/database.exception')

function errorMiddleware(err, req, res, next) {

    if(err.status === 500 || !err.message) {
        err = new InternalServerException('Internal server error');
    }
    
    let { message, code, error, status, data} = err;

    console.log(`[Error] ${err}`);

    headers = {
        success: "0",
        error,
        code,
        status,
        message,
        ...(data) && data
    }

    res.status(status).send({headers, body:{}});
}

module.exports = errorMiddleware;
/*
{
    type: 'err',
    status: 404,
    message: 'Not Found'
    data: {...} // optional
}
*/