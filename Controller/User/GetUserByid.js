import DB from "../../ConnectDB/DB.js";
import { UserSchema } from "../GetDataByuserId/getLinks.js";

export const GetUserId = async (req, res) => {
  try {
    const { error, value } = UserSchema.validate(req.params);

    if (error) {
      return res.status(404).json({
        statusbar: "error",
        message: "Data is required",
      });
    }

    const Query = "SELECT * FROM user WHERE id = ?";
    const Value = [value.userId];

    const [result] = await DB.promise().query(Query, Value);

    return res.status(200).json({
      statusbar: "success",
      result,
    });
  } catch (err) {
    return res.status(500).json({
      statusbar: "error",
      message: err.message || String(err),
    });
  }
};
