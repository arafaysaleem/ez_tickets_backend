const { query } = require('../db/db-connection');
const { multipleColumnSet, multipleFilterSet } = require('../utils/common.utils');
const { tables } = require('../utils/tableNames.utils');

class PaymentModel {

    findAll = async (params = {}) => {
        let sql = `SELECT * FROM ${tables.Payments}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { filterSet, filterValues } = multipleFilterSet(params);
        sql += ` WHERE ${filterSet}`;

        return await query(sql, [...filterValues]);
    }

    findOne = async (params) => {
        const { filterSet, filterValues } = multipleFilterSet(params);

        const sql = `SELECT * FROM ${tables.Payments}
        WHERE ${filterSet}`;

        const result = await query(sql, [...filterValues]);

        return result[0];
    }

    create = async ({ amount, payment_datetime, payment_method }) => {
        const sql = `INSERT INTO ${tables.Payments}
        ( amount, payment_datetime, payment_method ) 
        VALUES (?,?,?)`;

        const result = await query(sql, [amount, payment_datetime, payment_method]);

        const created_payment = !result ? 0 : {
            payment_id: result.insertId,
            affected_rows: result.affectedRows
        };

        return created_payment;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params);

        const sql = `UPDATE ${tables.Payments} SET ${columnSet} WHERE payment_id=?`;

        const result = await query(sql, [...values, id]);
        
        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${tables.Payments}
        WHERE payment_id=?`;

        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new PaymentModel;