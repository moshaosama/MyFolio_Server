import Joi from "joi";
import DB from "../../ConnectDB/DB.js";

export const UserSchema = Joi.object({
  userId: Joi.number().required(),
});

export const GetLinks = async (req, res) => {
  const { value, error } = UserSchema.validate(req.params);
  try {
    if (error) {
      return res.status(404).json({
        statusbar: "error",
        message: "Data is required",
      });
    }
    const Query = `
                SELECT * 
                FROM account 
                INNER JOIN navbar ON account.id = navbar.user_id 
                WHERE account.id = ?
                `;
    const Value = [value.userId];

    const [result] = await DB.query(Query, Value);

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
