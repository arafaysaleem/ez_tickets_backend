const { DBService } = require('../db/db-service');
const { multipleColumnSet, multipleFilterSet } = require('../utils/common.utils');
const UserRole = require('../utils/enums/userRoles.utils');
const { tables } = require('../utils/tableNames.utils');

class UserModel {

    findAll = async (params = {}) => {
        let sql = `SELECT * FROM ${tables.Users}`;

        if (!Object.keys(params).length) {
            return await DBService.query(sql);
        }

        const { filterSet, filterValues } = multipleFilterSet(params);
        sql += ` WHERE ${filterSet}`;

        return await DBService.query(sql, [...filterValues]);
    }

    findOne = async (params) => {
        const { filterSet, filterValues } = multipleFilterSet(params);

        const sql = `SELECT * FROM ${tables.Users}
        WHERE ${filterSet}`;

        const result = await DBService.query(sql, [...filterValues]);

        // return back the first row (user)
        return result[0];
    }

    create = async ({ full_name, email, password, role = UserRole.ApiUser, contact, address }) => {
        const sql = `INSERT INTO ${tables.Users}
        (full_name, email, password, role, contact, address) VALUES (?,?,?,?,?,?)`;

        const result = await DBService.query(sql, [full_name, email, password, role, contact, address]);
        const created_user = !result ? 0 : {
            user_id: result.insertId,
            affected_rows: result.affectedRows
        };

        return created_user;
    }

    update = async (params, filters) => {
        const { columnSet, values } = multipleColumnSet(params);
        const { filterSet, filterValues } = multipleFilterSet(filters);

        const sql = `UPDATE ${tables.Users} SET ${columnSet} WHERE ${filterSet}`;

        const result = await DBService.query(sql, [...values, ...filterValues]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${tables.Users}
        WHERE user_id = ?`;
        const result = await DBService.query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new UserModel;