const { DBService } = require('../db/db-service');
const { multipleColumnSet, multipleFilterSet } = require('../utils/common.utils');
const { tables } = require('../utils/tableNames.utils');

class MovieRoleModel {

    findAll = async (params = {}) => {
        let sql = `SELECT * FROM ${tables.MovieRoles}`;

        if (!Object.keys(params).length) {
            return await DBService.query(sql);
        }

        const { filterSet, filterValues } = multipleFilterSet(params);
        sql += ` WHERE ${filterSet}`;

        return await DBService.query(sql, [...filterValues]);
    }

    findOne = async (params) => {
        const { filterSet, filterValues } = multipleFilterSet(params);

        const sql = `SELECT * FROM ${tables.MovieRoles}
        WHERE ${filterSet}`;

        const result = await DBService.query(sql, [...filterValues]);

        // return back the first row (movie_role)
        return result[0];
    }

    create = async ({ movie_id, role_id, role_type }) => {
        const sql = `INSERT INTO ${tables.MovieRoles}
        (movie_id, role_id, role_type) 
        VALUES (?,?,?)`;

        const result = await DBService.query(sql, [movie_id, role_id, role_type]);

        return result;
    }

    update = async (params, filters) => {
        const { columnSet, values } = multipleColumnSet(params);
        const { filterSet, filterValues } = multipleFilterSet(filters);

        const sql = `UPDATE ${tables.MovieRoles} SET ${columnSet} WHERE ${filterSet}`;

        const result = await DBService.query(sql, [...values, ...filterValues]);
        
        return result;
    }

    delete = async (filters) => {
        const { filterSet, filterValues } = multipleFilterSet(filters);

        const sql = `DELETE FROM ${tables.MovieRoles}
        WHERE ${filterSet}`;

        const result = await DBService.query(sql, [...filterValues]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new MovieRoleModel;