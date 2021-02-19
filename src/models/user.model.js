const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const UserRole = require('../utils/userRoles.utils');
const { tables } = require('../utils/tableNames.utils');

class UserModel {

    findAll = async (params = {}) => {
        let sql = `SELECT * FROM ${tables.Users}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${tables.Users}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    create = async ({ full_name, email, password, role = UserRole.ApiUser, contact, address }) => {
        const sql = `INSERT INTO ${tables.Users}
        (full_name, email, password, role, contact, address) VALUES (?,?,?,?,?,?)`;

        const result = await query(sql, [full_name, email, password, role, contact, address]);
        const created_user = !result ? 0 : {
            'user_id':result.insertId,
            'affected_rows':result.affectedRows
        };

        return created_user;
    }

    update = async (params, filters) => {
        const { columnSet, values } = multipleColumnSet(params)
        filters = multipleColumnSet(filters);
        const filterSet = filters.columnSet;
        const filterValues = filters.values;

        const sql = `UPDATE ${tables.Users} SET ${columnSet} WHERE ${filterSet}`;

        const result = await query(sql, [...values, ...filterValues]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${tables.Users}
        WHERE user_id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new UserModel;