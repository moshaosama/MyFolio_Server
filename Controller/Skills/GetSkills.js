import DB from "../../ConnectDB/DB.js";
import { UserSchema } from "../GetDataByuserId/getLinks.js";

export const getSkills = async (req, res) => {
  const { value, error } = UserSchema.validate(req.params);
  try {
    if (error) {
      return res.status(404).json({
        statusbar: "error",
        message: "Data is required",
      });
    }

    const query = "SELECT * FROM skills WHERE user_id = ?";
    const Value = [value.userId];

    const [result] = await DB.promise().query(query, Value);

    return res.status(200).json({
      statusbar: "success",
      skills: result,
    });
  } catch (err) {
    return res.status(500).json({
      statusbar: "error",
      message: err.message || String(err),
    });
  }
};
