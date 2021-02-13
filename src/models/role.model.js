const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const { tables } = require('../utils/tableNames.utils');
class RoleModel {

    findAll = async (params = {}) => {
        let sql = `SELECT * FROM ${tables.Roles}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${tables.Roles}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (role)
        return result[0];
    }

    create = async ({ full_name, age, picture_url }) => {
        const sql = `INSERT INTO ${tables.Roles}
        (full_name, age, picture_url) 
        VALUES (?,?,?)`;

        const result = await query(sql, [full_name, age, picture_url]);
        const created_role = !result ? 0 : {
            'role_id':result.insertId,
            'affected_rows':result.affectedRows
        };

        return created_role;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE ${tables.Roles} SET ${columnSet} WHERE role_id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${tables.Roles}
        WHERE role_id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new RoleModel;