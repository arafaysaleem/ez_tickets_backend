const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const { tables } = require('../utils/tableNames.utils');

class MovieRoleModel {

    findAll = async (params = {}) => {
        let sql = `SELECT * FROM ${tables.MovieRoles}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${tables.MovieRoles}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (movie_role)
        return result[0];
    }

    create = async ({ movie_id, role_id, role_type }) => {
        const sql = `INSERT INTO ${tables.MovieRoles}
        (movie_id, role_id, role_type) 
        VALUES (?,?,?)`;

        const result = await query(sql, [movie_id, role_id, role_type]);

        return result;
    }

    update = async (params, filters) => {
        const { columnSet, values } = multipleColumnSet(params)
        filters = multipleColumnSet(filters);
        const filterSet = filters.columnSet;
        const filterValues = filters.values;

        const sql = `UPDATE ${tables.MovieRoles} SET ${columnSet} WHERE ${filterSet}`;

        const result = await query(sql, [...values, ...filterValues]);
        
        return result;
    }

    delete = async (filters) => {
        const { filterSet, filterValues } = multipleColumnSet(params)

        const sql = `DELETE FROM ${tables.MovieRoles}
        WHERE ${filterSet}`;

        const result = await query(sql, [...filterValues]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new MovieRoleModel;