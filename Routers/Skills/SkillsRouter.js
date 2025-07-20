import express from "express";
import { getSkills } from "../../Controller/Skills/GetSkills.js";
import { DeleteSkill } from "../../Controller/Skills/DeleteSkill.js";
import { CreateSkill } from "../../Controller/Skills/CreateSkill.js";

const skillsRouter = express.Router();

skillsRouter.route("/:userId").get(getSkills);
skillsRouter.route("/:skill_id").delete(DeleteSkill);
skillsRouter.route("/").post(CreateSkill);

export default skillsRouter;
