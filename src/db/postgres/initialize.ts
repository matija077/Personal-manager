import { connected } from "process";

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
    .then(() => clientWrapper.connected = true)
    .catch((error: any) => console.log(error));

var clientWrapper : {
    connected: boolean,
    client:  typeof Client
} = {
    connected: false,
    client
}

export default clientWrapper;