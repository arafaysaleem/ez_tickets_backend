function errorMiddleware(error, req, res, next) {
    let { status = 500, message, data } = error;

    console.log(`[Error] ${error}`);

    // If status code is 500 - change the message to Internal server error
    message = status === 500 || !message ? 'Internal server error' : message;
    if(message.includes('Duplicate entry') && message.includes('email')) {
        message = "Email already exists";
    }

    headers = {
        error: "1",
        // status,
        message,
        ...(data) && data
    }

    res.status(status).send({headers, body:{}});
}

module.exports = errorMiddleware;
/*
{
    type: 'error',
    status: 404,
    message: 'Not Found'
    data: {...} // optional
}
*/