import express from "express";
import { GetContact } from "../../Controller/Contact/GetContact.js";
import { EditContact } from "../../Controller/Contact/EditContact.js";

const contactRouter = express.Router();

contactRouter.route("/:userId").get(GetContact);
contactRouter.route("/").put(EditContact);

export default contactRouter;
