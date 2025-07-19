import express from "express";
import { connectDB } from "./ConnectDB/DB.js";
import cors from "cors";
import UserRouter from "./Routers/User/UserRouter.js";
import NavbarRouter from "./Routers/Navbar/NavbarRouter.js";
import dotenv from "dotenv";
import {
  DataByUserIdRouter,
  EditBioRouter,
  EditImageRouter,
  EditLinksRouter,
  EditNameRouter,
  EditTagsRouter,
} from "./Routers/DataByUserId/DataByUserIdRouter.js";
import ProjectRouter from "./Routers/Projects/ProjectRouter.js";
import skillsRouter from "./Routers/Skills/SkillsRouter.js";

const app = express();
//Middelwares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(dotenv.config({ path: ".env" }));

//Router
app.use("/create-new-user", UserRouter);
app.use("/get-user", UserRouter);
app.use("/create-links", NavbarRouter);
app.use("/links", DataByUserIdRouter);
app.use("/edit-image", EditImageRouter);
app.use("/edit-tags", EditTagsRouter);
app.use("/edit-name", EditNameRouter);
app.use("/edit-bio", EditBioRouter);
app.use("/edit-links", EditLinksRouter);
app.use("/get-projects", ProjectRouter);
app.use("/create-projects", ProjectRouter);
app.use("/delete-project", ProjectRouter);
app.use("/edit-project", ProjectRouter);
app.use("/get-skills", skillsRouter);

app.listen(3000, () => {
  console.log("Connected on 3000 successfully");
  connectDB();
});
