const pg = require("pg");
const { Client } = pg;

const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

function connect() {
    return async () => {
        await client
    }

}

//module.exports.connect = connect;

