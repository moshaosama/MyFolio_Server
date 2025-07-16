import express from "express";
import { CreateLinks } from "../../Controller/Navbar/CreateLinks.js";

const NavbarRouter = express.Router();

NavbarRouter.route("/").post(CreateLinks);

export default NavbarRouter;
