import express from "express";
import { GetProjects } from "../../Controller/Projects/getProjects.js";

const ProjectRouter = express.Router();

ProjectRouter.route("/:userId").get(GetProjects);

export default ProjectRouter;
