const mysql2 = require('mysql2');
const {
    DuplicateEntryException,
    ForeignKeyViolationException
} = require('../utils/exceptions/database.exception');
const { InternalServerException } = require('../utils/exceptions/api.exception');

class DBService {
    init ({ host, user, password, database, dateStrings }) {
        this.dbInstance = mysql2.createPool({
            host: host,
            user: user,
            password: password,
            database: database,
            dateStrings: dateStrings
        });
    }

    checkConnection () {
        this.dbInstance.getConnection((err, connection) => {
            if (err){
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                }
            }
            if (connection){
                this.dbConnection = connection;
                connection.release();
            }
            return;
        });
    }
    
    query = async (sql, values) => {
        return new Promise((resolve, reject) => {
            const callback = (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            };
            this.dbInstance.execute(sql, values, callback); // execute will internally call prepare and query
        }).catch((err) => {
            const mysqlErrorList = Object.keys(HttpStatusCodes);
            if (mysqlErrorList.includes(err.code)) {
                err.status = HttpStatusCodes[err.code];
                if (err.status === 409) throw new DuplicateEntryException(err.message);
                if (err.status === 512) throw new ForeignKeyViolationException(err.message);
            }

            console.log(`[DBError] ${err}`);
            console.log(`[Code] ${err.code}`);
            throw new InternalServerException();
            // throw err;
        });
    }

    beginTransaction = async () => {
        return new Promise((resolve, reject) => {
            const callback = (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            };
            this.dbConnection.beginTransaction(callback);
        });
    }

    rollback = async () => {
        return new Promise((resolve, reject) => {
            const callback = (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            };
            this.dbConnection.rollback(callback);
        });
    }

    commit = async () => {
        return new Promise((resolve, reject) => {
            const callback = (error, result) => {
                if (error) {
                    reject(error);
                    this.rollback();
                    return;
                }
                resolve(result);
            };
            this.dbConnection.commit(callback);
        });
    }
}

// ENUM of mysql errors mapped to http status codes
const HttpStatusCodes = Object.freeze({
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
    ER_DUP_ENTRY: 409,
    ER_NO_REFERENCED_ROW_2: 512
});

module.exports.DBService = new DBService();