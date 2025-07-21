import express from "express";
import { GetExperience } from "../../Controller/Experience/GetExperience.js";
import { CreateExperience } from "../../Controller/Experience/CreateExperience.js";
import { DeleteExperience } from "../../Controller/Experience/DeleteExperience.js";

const ExperineceRouter = express.Router();

ExperineceRouter.route("/:userId").get(GetExperience).post(CreateExperience);
ExperineceRouter.route("/:experience_id").delete(DeleteExperience);

export default ExperineceRouter;
