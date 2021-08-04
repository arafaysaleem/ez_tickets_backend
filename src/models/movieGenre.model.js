const { DBService } = require('../db/db-service');
const { multipleColumnSet, multipleFilterSet } = require('../utils/common.utils');
const { tables } = require('../utils/tableNames.utils');

class MovieGenreModel {

    findAll = async (params = {}) => {
        let sql = `SELECT * FROM ${tables.MovieGenres}`;

        if (!Object.keys(params).length) {
            return await DBService.query(sql);
        }

        const { filterSet, filterValues } = multipleFilterSet(params);
        sql += ` WHERE ${filterSet}`;

        return await DBService.query(sql, [...filterValues]);
    }

    findOne = async (params) => {
        const { filterSet, filterValues } = multipleFilterSet(params);

        const sql = `SELECT * FROM ${tables.MovieGenres}
        WHERE ${filterSet}`;

        const result = await DBService.query(sql, [...filterValues]);

        // return back the first row (movie_genre)
        return result[0];
    }

    create = async ({ movie_id, genre_id }) => {
        const sql = `INSERT INTO ${tables.MovieGenres}
        (movie_id, genre_id) 
        VALUES (?,?)`;

        const result = await DBService.query(sql, [movie_id, genre_id]);

        return result;
    }

    update = async (params, filters) => {
        const { columnSet, values } = multipleColumnSet(params);
        const { filterSet, filterValues } = multipleFilterSet(filters);

        const sql = `UPDATE ${tables.MovieGenres} SET ${columnSet} WHERE ${filterSet}`;

        const result = await DBService.query(sql, [...values, ...filterValues]);
        
        return result;
    }

    delete = async (filters) => {
        const { filterSet, filterValues } = multipleFilterSet(filters);

        const sql = `DELETE FROM ${tables.MovieGenres}
        WHERE ${filterSet}`;

        const result = await DBService.query(sql, [...filterValues]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new MovieGenreModel;