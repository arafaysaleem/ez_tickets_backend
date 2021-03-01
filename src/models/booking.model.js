const { query } = require('../db/db-connection');
const { multipleColumnSet, multipleFilterSet } = require('../utils/common.utils');
const { tables } = require('../utils/tableNames.utils');

class BookingModel {

    findAll = async (params = {}) => {
        let sql = `SELECT * FROM ${tables.Bookings}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { filterSet, filterValues } = multipleFilterSet(params);
        sql += ` WHERE ${filterSet}`;

        return await query(sql, [...filterValues]);
    }

    findOne = async (params) => {
        const { filterSet, filterValues } = multipleFilterSet(params);

        const sql = `SELECT * FROM ${tables.Bookings}
        WHERE ${filterSet}`;

        const result = await query(sql, [...filterValues]);

        return result[0];
    }

    create = async ({ user_id, show_id, seat_row, seat_number, price, booking_status }) => {
        const sql = `INSERT INTO ${tables.Bookings}
        ( user_id, show_id, seat_row, seat_number, price, booking_status ) 
        VALUES (?,?,?,?,?,?)`;

        const result = await query(sql, [user_id, show_id, seat_row, seat_number, price, booking_status]);

        return result;
    }

    update = async (params, filters) => {
        const { columnSet, values } = multipleColumnSet(params);
        const { filterSet, filterValues } = multipleFilterSet(filters);

        const sql = `UPDATE ${tables.Bookings} SET ${columnSet} WHERE ${filterSet}`;

        const result = await query(sql, [...values, ...filterValues]);
        
        return result;
    }

    delete = async (filters) => {
        const { filterSet, filterValues } = multipleFilterSet(filters);

        const sql = `DELETE FROM ${tables.Bookings}
        WHERE ${filterSet}`;

        const result = await query(sql, [...filterValues]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new BookingModel;