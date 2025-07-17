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
    const Value = [TagsValue.Tags, userIdValue.userId];

    await DB.promise().query(Query, Value);

    return res.status(200).json({
      statusbar: "success",
      message: "Updated Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      statusbar: "error",
      message: err.message || String(err),
    });
  }
};
