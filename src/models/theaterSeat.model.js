const { query } = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const { tables } = require('../utils/tableNames.utils');

class TheaterSeatModel {

    findAll = async (params = {}) => {
        let sql = `SELECT * FROM ${tables.TheaterSeats}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params);
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params);

        const sql = `SELECT * FROM ${tables.TheaterSeats}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        return result[0];
    }

    create = async ({ theater_id, seat_row, seat_number, seat_type }) => {
        const sql = `INSERT INTO ${tables.TheaterSeats}
        ( theater_id, seat_row, seat_number, seat_type ) 
        VALUES (?,?,?,?)`;

        const result = await query(sql, [theater_id, seat_row, seat_number, seat_type]);

        return result;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params);

        const sql = `UPDATE ${tables.TheaterSeats} SET ${columnSet} WHERE theater_id = ? `;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${tables.TheaterSeats}
        WHERE theater_id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new TheaterSeatModel;