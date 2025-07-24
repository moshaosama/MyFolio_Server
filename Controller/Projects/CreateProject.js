import DB from "../../ConnectDB/DB.js";
import { DefaultSkills } from "../../Constant/Skills.js";
import { UserSchema } from "../GetDataByuserId/getLinks.js";

export const CreateProject = async (req, res) => {
  const { value, error } = UserSchema.validate(req.params);
  try {
    if (error) {
      return res.status(404).json({
        statusbar: "error",
        message: "Data is required",
      });
    }

    const QueryCreateProject =
      "INSERT INTO projects (image, title, description,githubLink,liveDemoLink,user_id) VALUES (?,?,?,?,?,?)";

    const ValueCreateProject = [
      "",
      "CategYou - YouTube Playlist Organizer",
      "Transform your YouTube experience with nested folders, smart sorting, and intuitive drag-and-drop organization for your Liked Videos playlist.",
      "https://github.com/moshaosama/MyFolio",
      "https://my-folio-iota-eight.vercel.app/",
      value.userId,
    ];

    await DB.query(QueryCreateProject, ValueCreateProject);

    return res.status(200).json({
      statusbar: "success",
      message: "Created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      statusbar: "error",
      message: err.message || String(err),
    });
  }
};
