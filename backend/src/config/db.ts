import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Uppkoppling mot databasen
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT || "8889"), // Mac 8889, Windows 3306
});

export { pool };
