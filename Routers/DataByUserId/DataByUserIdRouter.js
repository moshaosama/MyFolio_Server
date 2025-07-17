import express from "express";
import { GetLinks } from "../../Controller/GetDataByuserId/getLinks.js";
import { DeleteLink } from "../../Controller/GetDataByuserId/DeleteLink.js";
import { UpdateImageUser } from "../../Controller/GetDataByuserId/UpdateImageUser.js";
import { Edittags } from "../../Controller/GetDataByuserId/EditTags.js";
import { EditName } from "../../Controller/GetDataByuserId/EditName.js";

const DataByUserIdRouter = express.Router();
const EditImageRouter = express.Router();
const EditTagsRouter = express.Router();
const EditNameRouter = express.Router();

DataByUserIdRouter.route("/:userId").get(GetLinks).delete(DeleteLink);
EditImageRouter.route("/:userId").put(UpdateImageUser);
EditTagsRouter.route("/:userId").put(Edittags);
EditNameRouter.route("/:userId").put(EditName);
export { DataByUserIdRouter, EditImageRouter, EditTagsRouter, EditNameRouter };
