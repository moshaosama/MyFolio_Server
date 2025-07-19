import mysql from "mysql2";
import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config({ path: ".env" });

const DB = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "myfolio",
});

export const connectDB = () => {
  DB.connect((err) => {
    if (err) {
      console.log("Error connecting to the database", err);
    } else {
      console.log("Connected to the database");
    }
  });
};

export default DB;
