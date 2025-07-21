import express from "express";
import { GetLinks } from "../../Controller/GetDataByuserId/getLinks.js";
import { DeleteLink } from "../../Controller/GetDataByuserId/DeleteLink.js";
import { UpdateImageUser } from "../../Controller/GetDataByuserId/UpdateImageUser.js";
import { Edittags } from "../../Controller/GetDataByuserId/EditTags.js";
import { EditName } from "../../Controller/GetDataByuserId/EditName.js";
import { EditBio } from "../../Controller/GetDataByuserId/EditBio.js";
import { EdtiLinks } from "../../Controller/GetDataByuserId/EditLinls.js";
import multer from "multer";

const DataByUserIdRouter = express.Router();
const EditImageRouter = express.Router();
const EditTagsRouter = express.Router();
const EditNameRouter = express.Router();
const EditBioRouter = express.Router();
const EditLinksRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

DataByUserIdRouter.route("/:userId").get(GetLinks).delete(DeleteLink);
EditImageRouter.route("/:userId").put(upload.single("image"), UpdateImageUser);
EditTagsRouter.route("/:userId").put(Edittags);
EditNameRouter.route("/:userId").put(EditName);
EditBioRouter.route("/:userId").put(EditBio);
EditLinksRouter.route("/:userId").put(EdtiLinks);
export {
  DataByUserIdRouter,
  EditImageRouter,
  EditTagsRouter,
  EditNameRouter,
  EditBioRouter,
  EditLinksRouter,
};
