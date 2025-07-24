import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const DB = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "myfolio",
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const connectDB = async () => {
  try {
    const connection = await DB.getConnection();
    console.log("Connected to DB, threadId:", connection.threadId);
    connection.release();
  } catch (err) {
    console.error("Error connecting to DB", err);
  }
};

export default DB;
