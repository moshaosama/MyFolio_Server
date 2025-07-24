import Joi from "joi";
import DB from "../../ConnectDB/DB.js";
import { UserSchema } from "./getLinks.js";

const BioSchema = Joi.object({
  Bio: Joi.string().required(),
});

export const EditBio = async (req, res) => {
  const { error: BioError, value: BioValue } = BioSchema.validate(req.body);
  const { error: userIdError, value: userIdValue } = UserSchema.validate(
    req.params
  );
  try {
    if (BioError || userIdError) {
      return res.status(404).json({
        statusbar: "error",
        message: "Data is required",
      });
    }

    const EditQuery = "UPDATE account SET Bio = ? WHERE id = ?";
    const EditValue = [BioValue.Bio, userIdValue.userId];

    await DB.query(EditQuery, EditValue);

    const QueryGetUser = "SELECT * FROM account WHERE id = ?";
    const ValueGetUser = [userIdValue.userId];

    const [result] = await DB.query(QueryGetUser, ValueGetUser);

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
