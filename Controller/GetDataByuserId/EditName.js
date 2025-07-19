import Joi from "joi";
import { UserSchema } from "./getLinks.js";
import DB from "../../ConnectDB/DB.js";

const userNameSchema = Joi.object({
  Name: Joi.string().required().min(3),
});
export const EditName = async (req, res) => {
  const { value: NameValue, error: NameError } = userNameSchema.validate(
    req.body
  );
  const { value: userIdValue, error: userIdError } = UserSchema.validate(
    req.params
  );
  try {
    if (NameError || userIdError) {
      return res.status(404).json({
        statusbar: "error",
        message: "Data is required",
      });
    }

    const Query = "UPDATE account SET Name = ? WHERE id = ?";
    const Value = [NameValue.Name, userIdValue.userId];

    await DB.promise().query(Query, Value);

    const QueryGetUser = "SELECT * FROM account WHERE id = ?";
    const ValueGetUser = [userIdValue.userId];

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
