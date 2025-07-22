import express from "express";
import DB from "./ConnectDB/DB.js";
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
import contactRouter from "./Routers/Contact/ContactRouter.js";
import ExperineceRouter from "./Routers/Experience/experienceRouter.js";
import chatgbtRouter from "./Routers/Chatgbt/ChatgbtRouter.js";

const app = express();
//Middelwares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
dotenv.config({ path: ".env" });
app.use("/uploads", express.static("uploads"));

// setInterval(() => {
//   DB.query("SELECT 1", (err) => {
//     if (err) {
//       console.error("MySQL Keep-Alive Failed:", err.message);
//     } else {
//       console.log("MySQL Keep-Alive Ping sent");
//     }
//   });
// }, 5 * 60 * 1000);

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
app.use("/delete-skill", skillsRouter);
app.use("/create-skill", skillsRouter);
app.use("/get-contact", contactRouter);
app.use("/edit-contact", contactRouter);
app.use("/get-experience", ExperineceRouter);
app.use("/create-experience", ExperineceRouter);
app.use("/delete-experience", ExperineceRouter);
app.use("/start-chat", chatgbtRouter);

app.listen(3000, () => {
  console.log("Connected on 3000 successfully");
});
