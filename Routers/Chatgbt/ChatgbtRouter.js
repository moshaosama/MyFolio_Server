import express from "express";
import { StartChat } from "../../Controller/Chatgbt/Start.js";
import { SendMessage } from "../../Controller/Chatgbt/Chat.js";

const chatgbtRouter = express.Router();

chatgbtRouter.route("/").post(StartChat);
chatgbtRouter.route("/chat").post(SendMessage);

export default chatgbtRouter;
