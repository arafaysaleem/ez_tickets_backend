const query = require('./db-connection');

class DBTransaction{
    beginTransaction = async () => await query('START TRANSACTION');
    rollback = async () => await query('ROLLBACK');
    commit = async () => await query('COMMIT');
}

module.exports = new DBTransaction();