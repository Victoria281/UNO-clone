const Pool = require("pg").Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'amanda19',
    host: 'localhost',
    port: 5432,
    database: 'uno_clone',
});

module.exports = pool;