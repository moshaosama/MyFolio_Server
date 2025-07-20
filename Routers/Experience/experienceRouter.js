import express from "express";
import { GetExperience } from "../../Controller/Experience/GetExperience.js";
import { CreateExperience } from "../../Controller/Experience/CreateExperience.js";

const ExperineceRouter = express.Router();

ExperineceRouter.route("/:userId").get(GetExperience).post(CreateExperience);

export default ExperineceRouter;
