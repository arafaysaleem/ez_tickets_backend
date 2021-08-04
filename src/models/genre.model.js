const { DBService } = require('../db/db-service');
const { multipleColumnSet, multipleFilterSet } = require('../utils/common.utils');
const { tables } = require('../utils/tableNames.utils');
class GenreModel {

    findAll = async (params = {}) => {
        let sql = `SELECT * FROM ${tables.Genres}`;

        if (!Object.keys(params).length) {
            return await DBService.query(sql);
        }

        const { filterSet, filterValues } = multipleFilterSet(params);
        sql += ` WHERE ${filterSet}`;

        return await DBService.query(sql, [...filterValues]);
    }

    findAllMoviesByGenre = async (params) => {
        const { filterSet, filterValues } = multipleFilterSet(params);

        const sql = `SELECT * FROM ${tables.Genres}
        NATURAL JOIN ${tables.MovieGenres}
        NATURAL JOIN ${tables.Movies}
        WHERE ${filterSet}`;

        const result = await DBService.query(sql, [...filterValues]);

        return result;
    }

    findOne = async (params) => {
        const { filterSet, filterValues } = multipleFilterSet(params);

        const sql = `SELECT * FROM ${tables.Genres}
        WHERE ${filterSet}`;

        const result = await DBService.query(sql, [...filterValues]);

        return result[0];
    }

    create = async ({ genre }) => {
        const sql = `INSERT INTO ${tables.Genres}
        (genre) 
        VALUES (?)`;

        const result = await DBService.query(sql, [genre]);
        const created_genre = !result ? 0 : {
            genre_id: result.insertId,
            affected_rows: result.affectedRows
        };

        return created_genre;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params);

        const sql = `UPDATE ${tables.Genres} SET ${columnSet} WHERE genre_id = ?`;

        const result = await DBService.query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${tables.Genres}
        WHERE genre_id = ?`;
        const result = await DBService.query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new GenreModel;