const { DBService } = require('../db/db-service');
const { multipleColumnSet, multipleFilterSet } = require('../utils/common.utils');
const { tables } = require('../utils/tableNames.utils');

class OTPModel {

    findAll = async (params = {}) => {
        let sql = `SELECT * FROM ${tables.OtpCodes}`;

        if (!Object.keys(params).length) {
            return await DBService.query(sql);
        }

        const { filterSet, filterValues } = multipleFilterSet(params);
        sql += ` WHERE ${filterSet}`;

        return await DBService.query(sql, [...filterValues]);
    }

    findOne = async (params) => {
        const { filterSet, filterValues } = multipleFilterSet(params);

        const sql = `SELECT * FROM ${tables.OtpCodes}
        WHERE ${filterSet}`;

        const result = await DBService.query(sql, [...filterValues]);

        return result[0];
    }

    create = async ({ user_id, email, OTP, expiration_datetime }) => {
        const sql = `INSERT INTO ${tables.OtpCodes}
        (user_id, email, OTP, expiration_datetime) VALUES (?,?,?,?)`;

        const result = await DBService.query(sql, [user_id, email, OTP, expiration_datetime]);
        const created_OTP = !result ? 0 : {
            user_id: result.insertId,
            affected_rows: result.affectedRows
        };

        return created_OTP;
    }

    update = async (expiration_datetime, id) => {

        const sql = `UPDATE ${tables.OtpCodes}
        SET expiration_datetime = ?
        WHERE user_id = ?`;

        const result = await DBService.query(sql, [expiration_datetime, id]);

        return result;
    }

    delete = async (params) => {
        const { columnSet, values } = multipleColumnSet(params);

        const sql = `DELETE FROM ${tables.OtpCodes}
        WHERE ${columnSet}`;

        const result = await DBService.query(sql, [...values]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new OTPModel;