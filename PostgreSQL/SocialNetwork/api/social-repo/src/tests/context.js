const { randomBytes } = require('crypto');
const { default:migrate } = require('node-pg-migrate');
const format = require('pg-format');
const pool = require('../pool');

const DEFAULT_CONN = {
    host: 'localhost',
    port: 5432,
    database: 'socialnetwork-test',
    user: 'postgres',
    password: 'password'
}

class Context {
    static async build() {
        // 1) Grenerate a random name to connect to PG as
        const roleName = 'a' + randomBytes(4).toString('hex');

        // 2) Connect to PG as root user
        await pool.connect(DEFAULT_CONN);

        // 3) Create a new role with the generated name
        // Can be used for SQL Injection so use format instead
        // %I : Identifier    %L : Literal value
        // await pool.query(`CREATE ROLE ${rolename} WITH LOGIN PASSWORD '${roleName}';`);
        await pool.query(format('CREATE ROLE %I WITH LOGIN PASSWORD %L;',roleName,roleName));

        // 4) Create a new schema with the genereated name
        // Can be used for SQL Injection so use format instead
        // %I : Identifier    %L : Literal value
        //await pool.query(`CREATE SCHEMA ${roleName} AUTHORIZTION ${roleName};`);
        await pool.query(format('CREATE SCHEMA %I AUTHORIZTION %I;',roleName,roleName));

        // 5) Disconnect from PG
        await pool.close();

        // 6) Run migrations in the new schema
        await migrate({
            schema: roleName,
            direction: 'up',
            log: () => {},
            noLock: true,
            dir: 'migrations',
            databaseUrl: {
                host: 'localhost',
                port: 5432,
                database: 'socialnetwork-test',
                user: roleName,
                password: roleName
            }
        });

        // 7) Connect as the newly created role
        await pool.connect({
            host: 'localhost',
            port: 5432,
            database: 'socialnetwork-test',
            user: roleName,
            password: roleName
        });

        return new Context(roleName);
    }

    async close() {
        // 1) Disconnect from PG
        await pool.close();

        // 2) Reconnect as root user
        await pool.connect(DEFAULT_CONN);

        // 3) Delete the schema
        await pool.query(format('DROP SCHEMA %I CASCADE;', this.roleName));

        // 4) Delete the user/role
        await pool.query(format('DROP ROLE %I;', this.roleName));

        // 4) Disconnect
        await pool.close();
    }

    async reset() {
        // Clean up tables. 
        // Add delete statements for each table.
        await pool.query(`
            DELETE FROM users;
        `);
    }

    constructor(roleName) {
        this.roleName = roleName;
    }
}

module.exports = Context;