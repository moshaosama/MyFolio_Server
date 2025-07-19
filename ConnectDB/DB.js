import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const DB = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "myfolio",
  port: process.env.DB_PORT || 3306,
});

export const connectDB = () => {
  DB.connect((err) => {
    if (err) {
      console.log("Error connecting to DB", err);
    } else {
      console.log("Connected to DB");
    }
  });
};

export default DB;
