const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const { tables } = require('../utils/tableNames.utils');

class OTPModel {

    findAll = async (params = {}) => {
        let sql = `SELECT * FROM ${tables.VerificationCodes}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${tables.VerificationCodes}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    create = async ({ user_id, email, OTP, expiration_datetime }) => {
        const sql = `INSERT INTO ${tables.VerificationCodes}
        (user_id, email, OTP, expiration_datetime) VALUES (?,?,?)`;

        const result = await query(sql, [user_id, email, OTP, expiration_datetime]);
        const created_OTP = !result ? 0 : {
            'user_id':result.insertId,
            'affected_rows':result.affectedRows
        };

        return created_OTP;
    }

    update = async (expiration_datetime, id) => {

        const sql = `UPDATE ${tables.VerificationCodes}
        SET expiration_datetime = ?
        WHERE user_id = ?`;

        const result = await query(sql, [expiration_datetime, id]);

        return result;
    }

    delete = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `DELETE FROM ${tables.VerificationCodes}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new OTPModel;