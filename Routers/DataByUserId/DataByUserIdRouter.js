import express from "express";
import { GetLinks } from "../../Controller/GetDataByuserId/getLinks.js";
import { DeleteLink } from "../../Controller/GetDataByuserId/DeleteLink.js";
import { UpdateImageUser } from "../../Controller/GetDataByuserId/UpdateImageUser.js";

const DataByUserIdRouter = express.Router();
const EditImageRouter = express.Router();

DataByUserIdRouter.route("/:userId").get(GetLinks).delete(DeleteLink);
EditImageRouter.route("/:userId").put(UpdateImageUser);
export { DataByUserIdRouter, EditImageRouter };
