const { DBService } = require('../db/db-service');
const { multipleColumnSet, multipleFilterSet } = require('../utils/common.utils');
const { tables } = require('../utils/tableNames.utils');

class TheaterModel {

    findAll = async (params = {}) => {
        let sql = `SELECT * FROM ${tables.Theaters}
        NATURAL JOIN ${tables.TheaterSeats}`;

        if (!Object.keys(params).length) {
            return await DBService.query(sql);
        }

        const { filterSet, filterValues } = multipleFilterSet(params);
        sql += ` WHERE ${filterSet}`;

        return await DBService.query(sql, [...filterValues]);
    }

    findOne = async (params) => {
        const { filterSet, filterValues } = multipleFilterSet(params);

        const sql = `SELECT * FROM ${tables.Theaters}
        NATURAL JOIN ${tables.TheaterSeats}
        WHERE ${filterSet}`;

        const result = await DBService.query(sql, [...filterValues]);

        return result;
    }

    create = async ({ theater_name, num_of_rows, seats_per_row, theater_type }) => {
        const sql = `INSERT INTO ${tables.Theaters}
        ( theater_name, num_of_rows, seats_per_row, theater_type ) VALUES (?,?,?,?)`;

        const result = await DBService.query(sql, [theater_name, num_of_rows, seats_per_row, theater_type]);
        const created_theater = !result ? 0 : {
            theater_id: result.insertId,
            affected_rows: result.affectedRows
        };

        return created_theater;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params);

        const sql = `UPDATE ${tables.Theaters} SET ${columnSet} WHERE theater_id = ? `;

        const result = await DBService.query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${tables.Theaters}
        WHERE theater_id = ?`;
        const result = await DBService.query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new TheaterModel;