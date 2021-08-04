const { DBService } = require('../db/db-service');
const { multipleColumnSet, multipleFilterSet } = require('../utils/common.utils');
const { tables } = require('../utils/tableNames.utils');

class BookingModel {

    findAll = async (params = {}) => {
        let sql = `SELECT * FROM ${tables.Bookings}`;

        if (!Object.keys(params).length) {
            return await DBService.query(sql);
        }
        const { filterSet, filterValues } = multipleFilterSet(params);
        sql += ` WHERE ${filterSet}`;

        return await DBService.query(sql, [...filterValues]);
    }

    findAllByUser = async (id, params = {}) => {
        let sql = `SELECT booking_id, show_id, price, seat_row,
        seat_number, booking_status, booking_datetime, title, poster_url,
        start_time, date, show_type FROM ${tables.Bookings}
        NATURAL JOIN ${tables.Shows}
        NATURAL JOIN ${tables.Movies}
        WHERE user_id = ?`;

        if (!Object.keys(params).length) {
            return await DBService.query(sql, [id]);
        }

        const { filterSet, filterValues } = multipleFilterSet(params);
        sql += ` AND ${filterSet}`;

        return await DBService.query(sql, [id, ...filterValues]);
    }

    findAllByShow = async (id, params = {}) => {
        let sql = `SELECT * FROM ${tables.Bookings}
        NATURAL JOIN ${tables.Shows}
        WHERE show_id = ?`;

        if (!Object.keys(params).length) {
            return await DBService.query(sql, [id]);
        }

        const { filterSet, filterValues } = multipleFilterSet(params);
        sql += ` AND ${filterSet}`;

        return await DBService.query(sql, [id, ...filterValues]);
    }

    findOne = async (params) => {
        const { filterSet, filterValues } = multipleFilterSet(params);

        const sql = `SELECT * FROM ${tables.Bookings}
        WHERE ${filterSet}`;

        const result = await DBService.query(sql, [...filterValues]);

        return result[0];
    }

    create = async ({ user_id, show_id, seat_row, seat_number, price, booking_status, booking_datetime }) => {
        const sql = `INSERT INTO ${tables.Bookings}
        ( user_id, show_id, seat_row, seat_number, price, booking_status, booking_datetime ) 
        VALUES (?,?,?,?,?,?,?)`;

        const result = await DBService.query(sql, [user_id, show_id, seat_row, seat_number, price, booking_status, booking_datetime]);

        const created_booking = !result ? 0 : {
            booking_id: result.insertId,
            affected_rows: result.affectedRows
        };

        return created_booking;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params);

        const sql = `UPDATE ${tables.Bookings} SET ${columnSet} WHERE booking_id=?`;

        const result = await DBService.query(sql, [...values, id]);
        
        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${tables.Bookings}
        WHERE booking_id=?`;

        const result = await DBService.query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new BookingModel;