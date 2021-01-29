const pg = require("pg");
const { Client } = pg;

const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

client.connect()
    .then(() => console.log("connected"))
    .catch((error) => console.log(error));

function connect() {
    client.query('SELECT * from user',)
        .then(function resolved(result) {
            console.log(result);
        }).catch(function rejected(error) {
            console.log(error);
        }).finally(function after() {
            console.log("after");
        })
}

connect();

//module.exports.connect = connect;

