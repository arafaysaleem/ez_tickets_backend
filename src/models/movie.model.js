const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

class MovieModel {
    tableName = 'movies';

    findAll = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (movie)
        return result[0];
    }

    create = async ({ title, year, summary, rating=null, trailer_url, poster_url, movie_type }) => {
        const sql = `INSERT INTO ${this.tableName}
        (title, year, summary, rating, trailer_url, poster_url, movie_type) 
        VALUES (?,?,?,?,?,?,?)`;

        const result = await query(sql, [title, year, summary, rating, trailer_url, poster_url, movie_type]);
        const created_movie = !result ? 0 : {
            'movie_id':result.insertId,
            'affected_rows':result.affectedRows
        };

        return created_movie;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE movie_id = ?`;

        const result = await query(sql, [...values, id]);
        
        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE movie_id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new MovieModel;