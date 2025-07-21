import DB from "../../ConnectDB/DB.js";
import { UserSchema } from "../GetDataByuserId/getLinks.js";

export const GetContact = async (req, res) => {
  const { value, error } = UserSchema.validate(req.params);
  try {
    if (error) {
      return res.status(404).json({
        statusbar: "error",
        message: "Data is required",
      });
    }

    const Query = "SELECT * FROM contact_us WHERE user_id = ?";
    const Value = [value.userId];

    const [result] = await DB.promise().query(Query, Value);

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
