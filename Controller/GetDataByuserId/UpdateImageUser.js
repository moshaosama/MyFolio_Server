import { UserSchema } from "./getLinks.js";
import DB from "../../ConnectDB/DB.js";

export const UpdateImageUser = async (req, res) => {
  const { error: ErrorUserId, value: UserIdValue } = UserSchema.validate(
    req.params
  );

  try {
    if (!req.file || ErrorUserId) {
      return res.status(400).json({
        statusbar: "error",
        message: "Image file and userId are required",
      });
    }

    const imagePath = req.file.filename;

    const Query = "UPDATE account SET image = ? WHERE id = ?";
    const Value = [imagePath, UserIdValue.userId];

    await DB.promise().query(Query, Value);

    const QueryGetUser = "SELECT  * FROM account WHERE id = ?";
    const ValueGetUser = [UserIdValue.userId];

    const [result] = await DB.promise().query(QueryGetUser, ValueGetUser);

    return res.status(200).json({
      statusbar: "success",
      user: result,
    });
  } catch (err) {
    return res.status(500).json({
      statusbar: "error",
      message: err.message || String(err),
    });
  }
};
