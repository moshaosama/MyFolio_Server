import express from "express";
import { GetLinks } from "../../Controller/GetDataByuserId/getLinks.js";
import { DeleteLink } from "../../Controller/GetDataByuserId/DeleteLink.js";

const DataByUserIdRouter = express.Router();

DataByUserIdRouter.route("/:userId").get(GetLinks).delete(DeleteLink);

export default DataByUserIdRouter;
