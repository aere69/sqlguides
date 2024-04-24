const pg = require('pg');

//-----------------------------------------------------
// Normal way to create a PostgreSQL client pool.
// Hard for testing if we need to connect to different 
// Databases.
//-----------------------------------------------------
//const pool = new pg.Pool({
//    host: 'localhost',
//    port: 5432
//});

//module.exports = pool;
//-----------------------------------------------------

// Create a class to make it easier to connect to
// different databases
class Pool {
    _pool = null;

    connect(options) {
        this._pool = new pg.Pool(options);
        // Run a basic query to make sure the connection
        // to the database is successful.
        return this._pool.query('SELECT 1 + 1;');
    }

    close() {
        return this._pool.end();
    }

    query(sql, params) {
        return this._pool.query(sql, params);
    }
};

module.exports = new Pool();