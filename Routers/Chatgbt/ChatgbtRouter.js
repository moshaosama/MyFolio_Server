import express from "express";
import { StartChat } from "../../Controller/Chatgbt/Start.js";

const chatgbtRouter = express.Router();

chatgbtRouter.route("/").post(StartChat);

export default chatgbtRouter;
