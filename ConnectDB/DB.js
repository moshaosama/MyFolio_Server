import mysql from "mysql2";

const DB = mysql.createConnection({
  host: process.env.MYSQLHOST || "localhost",
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQL_ROOT_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "myfolio",
  //   port: process.env.MYSQLPORT || 3306,
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
