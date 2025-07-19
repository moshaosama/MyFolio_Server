import express from "express";
import { getSkills } from "../../Controller/Skills/GetSkills.js";

const skillsRouter = express.Router();

skillsRouter.route("/:userId").get(getSkills);

export default skillsRouter;
