import express from "express";
import { connectDB } from "./ConnectDB/DB.js";
import cors from "cors";
import UserRouter from "./Routers/User/UserRouter.js";
import NavbarRouter from "./Routers/Navbar/NavbarRouter.js";
import {
  DataByUserIdRouter,
  EditBioRouter,
  EditImageRouter,
  EditLinksRouter,
  EditNameRouter,
  EditTagsRouter,
} from "./Routers/DataByUserId/DataByUserIdRouter.js";

const app = express();
//Middelwares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

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

app.listen(3000, () => {
  console.log("Connected on 3000 successfully");
  connectDB();
});
