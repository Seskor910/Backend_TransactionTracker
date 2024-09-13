const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'transaksi_db',
    password: '040402',
    port: 5432,
});

module.exports = pool