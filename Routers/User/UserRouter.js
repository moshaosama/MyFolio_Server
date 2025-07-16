import express from "express";
import { CreateNewUser } from "../../Controller/User/CreateNewUser.js";
import { GetUserId } from "../../Controller/User/GetUserByid.js";

const UserRouter = express.Router();

UserRouter.route("/").post(CreateNewUser);
UserRouter.route("/:userId").get(GetUserId);

export default UserRouter;
