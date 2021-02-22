const { validationResult } = require('express-validator');
const { InvalidPropertiesException } = require('../utils/exceptions/validation.exception');

exports.checkValidation = (req) => {
    const data = validationResult(req);
    if (!data.isEmpty()) {
        throw new InvalidPropertiesException('Missing or invalid properties', {data: data.errors});
    }
};