import express from "express";
import { CreateNewUser } from "../../Controller/User/CreateNewUser.js";

const UserRouter = express.Router();

UserRouter.route("/").post(CreateNewUser);

export default UserRouter;
