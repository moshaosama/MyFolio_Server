import Joi from "joi";
import { UserSchema } from "./getLinks.js";
import DB from "../../ConnectDB/DB.js";

const TagsSchema = Joi.object({
  Tags: Joi.string().required(),
});

export const Edittags = async (req, res) => {
  const { value: TagsValue, error: TagsError } = TagsSchema.validate(req.body);
  const { value: userIdValue, error: userIdError } = UserSchema.validate(
    req.params
  );
  try {
    if (TagsError || userIdError) {
      return res.status(404).json({
        statusbar: "error",
        message: "Data is required",
      });
    }

    const Query = "UPDATE user SET Tags = ? WHERE id = ?";
    const Value = [JSON.stringify(TagsValue.Tags), userIdValue.userId];

    await DB.promise().query(Query, Value);

    const QueryGetUser = "SELECT * FROM user WHERE id = ?";
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
