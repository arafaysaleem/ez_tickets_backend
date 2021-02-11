exports.multipleColumnSet = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }

    const keys = Object.keys(object);
    const values = Object.values(object);

    columnSet = keys.map(key => `${key} = ?`).join(', ');

    return {
        columnSet,
        values
    }
}

exports.structureResponse = (body,error,message) => {
    return {
        "headers": {error, message},
        "body": body
    }
}

exports.yearRegex = new RegExp(/^(19[5-9]\d|20[0-4]\d|2050)$/);