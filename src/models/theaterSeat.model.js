const { DBService } = require('../db/db-service');
const { multipleColumnSet, multipleFilterSet } = require('../utils/common.utils');
const { tables } = require('../utils/tableNames.utils');

class TheaterSeatModel {

    findAll = async (params = {}) => {
        let sql = `SELECT * FROM ${tables.TheaterSeats}`;

        if (!Object.keys(params).length) {
            return await DBService.query(sql);
        }

        const { filterSet, filterValues } = multipleFilterSet(params);
        sql += ` WHERE ${filterSet}`;

        return await DBService.query(sql, [...filterValues]);
    }

    findOne = async (params) => {
        const { filterSet, filterValues } = multipleFilterSet(params);

        const sql = `SELECT * FROM ${tables.TheaterSeats}
        WHERE ${filterSet}`;

        const result = await DBService.query(sql, [...filterValues]);

        return result[0];
    }

    create = async ({ theater_id, seat_row, seat_number, seat_type }) => {
        const sql = `INSERT INTO ${tables.TheaterSeats}
        ( theater_id, seat_row, seat_number, seat_type ) 
        VALUES (?,?,?,?)`;

        const result = await DBService.query(sql, [theater_id, seat_row, seat_number, seat_type]);

        return result;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params);

        const sql = `UPDATE ${tables.TheaterSeats} SET ${columnSet} WHERE theater_id = ? `;

        const result = await DBService.query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${tables.TheaterSeats}
        WHERE theater_id = ?`;
        const result = await DBService.query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new TheaterSeatModel;