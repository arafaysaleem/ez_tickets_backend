const { DBService } = require('../db/db-service');
const { multipleColumnSet, multipleFilterSet } = require('../utils/common.utils');
const { tables } = require('../utils/tableNames.utils');

class MovieModel {

    findAll = async (params = {}) => {
        let sql = `SELECT * FROM ${tables.Movies}
        NATURAL JOIN ${tables.MovieGenres}
        NATURAL JOIN ${tables.Genres}`;

        if (!Object.keys(params).length) {
            return await DBService.query(sql);
        }

        const { filterSet, filterValues } = multipleFilterSet(params);
        sql += ` WHERE ${filterSet}`;

        return await DBService.query(sql, [...filterValues]);
    }

    findOne = async (params) => {
        const { filterSet, filterValues } = multipleFilterSet(params);

        const sql = `SELECT * FROM ${tables.Movies}
        NATURAL JOIN ${tables.MovieGenres}
        NATURAL JOIN ${tables.Genres}
        WHERE ${filterSet}`;

        const result = await DBService.query(sql, [...filterValues]);

        return result;
    }

    findAllRolesByMovie = async (params) => {
        const { filterSet, filterValues } = multipleFilterSet(params);

        const sql = `SELECT * FROM ${tables.MovieRoles}
        NATURAL JOIN ${tables.Roles}
        WHERE ${filterSet}`;

        const result = await DBService.query(sql, [...filterValues]);

        return result;
    }

    create = async ({ title, year, summary, rating = null, trailer_url, poster_url, movie_type }) => {
        const sql = `INSERT INTO ${tables.Movies}
        (title, year, summary, rating, trailer_url, poster_url, movie_type) 
        VALUES (?,?,?,?,?,?,?)`;

        const result = await DBService.query(sql, [title, year, summary, rating, trailer_url, poster_url, movie_type]);

        const created_movie = !result ? 0 : {
            movie_id: result.insertId,
            affected_rows: result.affectedRows
        };

        return created_movie;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params);

        const sql = `UPDATE ${tables.Movies} SET ${columnSet} WHERE movie_id = ?`;

        const result = await DBService.query(sql, [...values, id]);
        
        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${tables.Movies}
        WHERE movie_id = ?`;
        const result = await DBService.query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new MovieModel;