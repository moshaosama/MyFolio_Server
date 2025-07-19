import express from "express";
import { GetProjects } from "../../Controller/Projects/getProjects.js";
import { CreateProject } from "../../Controller/Projects/CreateProject.js";
import { DeleteProject } from "../../Controller/Projects/DeleteProject.js";
import { EditProjects } from "../../Controller/Projects/EditProjects.js";

const ProjectRouter = express.Router();

ProjectRouter.route("/:userId").get(GetProjects).post(CreateProject);
ProjectRouter.route("/:project_id").delete(DeleteProject).put(EditProjects);

export default ProjectRouter;
