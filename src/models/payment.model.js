const { DBService } = require('../db/db-service');
const { multipleColumnSet, multipleFilterSet } = require('../utils/common.utils');
const { tables } = require('../utils/tableNames.utils');

class PaymentModel {

    findAll = async (params = {}) => {
        let sql = `SELECT * FROM ${tables.Payments}`;

        if (!Object.keys(params).length) {
            return await DBService.query(sql);
        }

        const { filterSet, filterValues } = multipleFilterSet(params);
        sql += ` WHERE ${filterSet}`;

        return await DBService.query(sql, [...filterValues]);
    }

    findAllByUser = async (id, params = {}) => {
        let sql = `SELECT payment_id, amount, payment_datetime, payment_method, title, poster_url
        FROM ${tables.Payments}
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

    findOne = async (params) => {
        const { filterSet, filterValues } = multipleFilterSet(params);

        const sql = `SELECT * FROM ${tables.Payments}
        WHERE ${filterSet}`;

        const result = await DBService.query(sql, [...filterValues]);

        return result[0];
    }

    create = async ({ amount, payment_datetime, payment_method, user_id, show_id }) => {
        const sql = `INSERT INTO ${tables.Payments}
        ( amount, payment_datetime, payment_method, user_id, show_id ) 
        VALUES (?,?,?,?,?)`;

        const result = await DBService.query(sql, [amount, payment_datetime, payment_method, user_id, show_id]);

        const created_payment = !result ? 0 : {
            payment_id: result.insertId,
            affected_rows: result.affectedRows
        };

        return created_payment;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params);

        const sql = `UPDATE ${tables.Payments} SET ${columnSet} WHERE payment_id=?`;

        const result = await DBService.query(sql, [...values, id]);
        
        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${tables.Payments}
        WHERE payment_id=?`;

        const result = await DBService.query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new PaymentModel;