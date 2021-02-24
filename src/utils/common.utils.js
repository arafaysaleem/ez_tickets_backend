const bcrypt = require('bcryptjs');

exports.multipleColumnSet = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }

    const keys = Object.keys(object);
    const values = Object.values(object);

    const columnSet = keys.map(key => `${key} = ?`).join(', ');

    return {
        columnSet,
        values
    };
};

exports.structureResponse = (body, success, message) => {
    return {
        headers: {success, message},
        body: body
    };
};

exports.hashPassword = async (req) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 8);
    }
}

exports.yearRegex = new RegExp(/^(19[5-9]\d|20[0-4]\d|2050)$/);

exports.OTPRegex = new RegExp(/^[0-9]{4}$/);

exports.seatRegex = new RegExp(/^[A-Z]{1,2}-[0-9]{1,}$/);

exports.timeRegex = new RegExp(/^(10|11|12|[1-9]):[0-5][0-9]$/);