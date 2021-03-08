const { query } = require('../db/db-connection');
const { multipleColumnSet, multipleFilterSet } = require('../utils/common.utils');
const { tables } = require('../utils/tableNames.utils');

class ShowModel {

    findAll = async (params = {}) => {
        let sql = `SELECT * FROM ${tables.Shows}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { filterSet, filterValues } = multipleFilterSet(params);
        sql += ` WHERE ${filterSet}`;

        return await query(sql, [...filterValues]);
    }

    findTimeConflicts = async ({start_time, end_time, date, theater_id}) => {
        const sql = `SELECT COUNT(*) FROM ${tables.Shows}
        WHERE theater_id = ? AND date = ?
        AND (? BETWEEN start_time AND end_time
        OR ? BETWEEN start_time AND end_time
        OR (start_time AND end_time) BETWEEN ? AND ?)`;

        const result = await query(sql, [theater_id, date, start_time, end_time, start_time, end_time]);

        return result[0]['COUNT(*)'];
    }

    findOne = async (params) => {
        const { filterSet, filterValues } = multipleFilterSet(params);

        const sql = `SELECT * FROM ${tables.Shows}
        WHERE ${filterSet}`;

        const result = await query(sql, [...filterValues]);

        return result[0];
    }

    findBookings = async (params) => {
        let sql = `SELECT * FROM ${tables.Bookings}
        NATURAL JOIN ${tables.Shows}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { filterSet, filterValues } = multipleFilterSet(params);
        sql += ` WHERE ${filterSet}`;

        return await query(sql, [...filterValues]);
    }

    create = async ({ start_time, end_time, date, movie_id, theater_id, show_status }) => {
        const sql = `INSERT INTO ${tables.Shows}
        (start_time, end_time, date, movie_id, theater_id, show_status) 
        VALUES (?,?,?,?,?,?)`;

        const result = await query(sql, [start_time, end_time, date, movie_id, theater_id, show_status]);

        const created_show = !result ? 0 : {
            show_id: result.insertId,
            affected_rows: result.affectedRows
        };

        return created_show;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params);

        const sql = `UPDATE ${tables.Shows} SET ${columnSet} WHERE show_id = ?`;

        const result = await query(sql, [...values, id]);
        
        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${tables.Shows}
        WHERE show_id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new ShowModel;