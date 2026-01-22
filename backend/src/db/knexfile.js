import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

export default {
  client: "mssql",
  connection: {
    server: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    options: {
      encrypt: false,
      trustServerCertificate: true,
      enableArithAbort: true,
    },
  },
  pool: {
    min: 0,
    max: 10,
  },
};
