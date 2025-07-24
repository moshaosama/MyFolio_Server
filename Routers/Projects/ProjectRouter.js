import express from "express";
import { GetProjects } from "../../Controller/Projects/getProjects.js";
import { CreateProject } from "../../Controller/Projects/CreateProject.js";
import { DeleteProject } from "../../Controller/Projects/DeleteProject.js";
import { EditProjects } from "../../Controller/Projects/EditProjects.js";
import { GetSkillProject } from "../../Controller/Projects/getSkillProject.js";

const ProjectRouter = express.Router();

ProjectRouter.route("/:userId").get(GetProjects).post(CreateProject);
ProjectRouter.route("/:project_id").delete(DeleteProject).put(EditProjects);
ProjectRouter.route("/skills/:project_id").get(GetSkillProject);

export default ProjectRouter;
