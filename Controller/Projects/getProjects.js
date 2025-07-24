import DB from "../../ConnectDB/DB.js";
import { UserSchema } from "../GetDataByuserId/getLinks.js";

export const GetProjects = async (req, res) => {
  const { value, error } = UserSchema.validate(req.params);
  try {
    if (error) {
      return res.status(404).json({
        statusbar: "error",
        message: "Data is required",
      });
    }
    const Query = "SELECT * FROM projects WHERE user_id = ?";
    const Values = [value.userId];

    const [result] = await DB.query(Query, Values);

    return res.status(200).json({
      statusbar: "success",
      projects: result,
    });
  } catch (err) {
    return res.status(500).json({
      statusbar: "error",
      message: err.message || String(err),
    });
  }
};
