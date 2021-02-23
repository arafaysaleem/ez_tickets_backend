const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const { tables } = require('../utils/tableNames.utils');

class TheaterModel {

    findAll = async (params = {}) => {
        let sql = `SELECT * FROM ${tables.Theaters}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params);
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params);

        const sql = `SELECT * FROM ${tables.Theaters}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    create = async ({ theater_name, num_of_rows, seats_per_row }) => {
        const sql = `INSERT INTO ${tables.Theaters}
        ( theater_name, num_of_rows, seats_per_row ) VALUES (?,?,?)`;

        const result = await query(sql, [theater_name, num_of_rows, seats_per_row]);
        const created_user = !result ? 0 : {
            theater_id: result.insertId,
            affected_rows: result.affectedRows
        };

        return created_user;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params);

        const sql = `UPDATE ${tables.Theaters} SET ${columnSet} WHERE theater_id = ? `;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${tables.Theaters}
        WHERE theater_id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new TheaterModel;