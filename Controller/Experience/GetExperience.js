import DB from "../../ConnectDB/DB.js";
import { UserSchema } from "../GetDataByuserId/getLinks.js";

export const GetExperience = async (req, res) => {
  const { value, error } = UserSchema.validate(req.params);

  try {
    const Query = "SELECT * FROM experience WHERE user_id = ?";
    const Value = [value.userId];

    const [result] = await DB.promise().query(Query, Value);

    return res.status(200).json({
      statusbar: "success",
      experience: result,
    });
  } catch (err) {
    return res.status(500).json({
      statusbar: "error",
      message: err.message || String(err),
    });
  }
};
