import { Pool } from 'pg'; // PostgreSQL example
// or import mysql from 'mysql2/promise'; // MySQL example
// or import sqlite3 from 'sqlite3'; // SQLite example

export const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});

// pool.on('error', (err, client) => {
//   console.error('Unexpected error on idle client', err)
//   console.log("client", client)
//   process.exit(-1)
// })

// pool.on("connect", (client) => {
//   console.log("COnnected successfully")
//   console.log(client)
// })

// const client = await pool.connect()
// client.release()