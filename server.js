import express from "express";
import { connectDB } from "./ConnectDB/DB.js";

const app = express();

app.listen(3000, () => {
  console.log("Connected on 3000 successfully");
  connectDB();
});
