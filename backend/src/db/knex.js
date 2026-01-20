import Knex from "knex";
import { Model } from "objection";
import knexConfig from "./knexfile.js";
import sql from "mssql";

async function ensureDatabase() {
  const { database, ...connectionWithoutDb } = knexConfig.connection;

  try {
    console.log("Connecting to SQL Server...");
    await sql.connect(connectionWithoutDb);
    console.log("Connected to SQL Server!");

    // Check if database exists
    const result = await sql.query`
      SELECT name FROM sys.databases WHERE name = ${database}
    `;

    if (result.recordset.length === 0) {
      console.log(`Database '${database}' doesn't exist. Creating...`);
      await sql.query(`CREATE DATABASE [${database}]`);
      console.log(`Database '${database}' created successfully!`);
    }

    await sql.close();
  } catch (err) {
    console.error("Failed to ensure database exists:", err.message);
    throw err;
  }
}

async function testConnection() {
  try {
    await ensureDatabase();
    await sql.connect(knexConfig.connection);
    const result = await sql.query("SELECT DB_NAME() AS [database]");
    console.log("Connected to database:", result.recordset[0].database);
    await sql.close();
  } catch (err) {
    console.error("Connection test failed:", err.message);
    process.exit(1);
  }
}

testConnection();

const knex = Knex(knexConfig);
Model.knex(knex);

export default knex;
