const { query } = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const { tables } = require('../utils/tableNames.utils');

class ShowModel {

    findAll = async (params = {}) => {
        let sql = `SELECT * FROM ${tables.Shows}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params);
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params);

        const sql = `SELECT * FROM ${tables.Shows}
        WHERE ${columnSet}
        GROUP BY show_id`;

        const result = await query(sql, [...values]);

        // return back the first row (movie)
        return result;
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