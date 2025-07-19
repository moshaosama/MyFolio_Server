import Joi from "joi";
import { UserSchema } from "./getLinks.js";
import DB from "../../ConnectDB/DB.js";

const ImageSchema = Joi.object({
  imageName: Joi.string().required(),
});

export const UpdateImageUser = async (req, res) => {
  const { error: ErrorImage, value: ImageValue } = ImageSchema.validate(
    req.body
  );
  const { error: ErrorUserId, value: UserIdValue } = UserSchema.validate(
    req.params
  );
  try {
    if (ErrorImage || ErrorUserId) {
      return res.status(404).json({
        statusbar: "error",
        message: "Data is required",
      });
    }
    const Query = "UPDATE account SET image = ? WHERE id = ?";
    const Value = [ImageValue.imageName, UserIdValue.userId];

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
