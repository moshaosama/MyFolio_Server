import Joi from "joi";
import DB from "../../ConnectDB/DB.js";

const ExperienceSchema = Joi.object({
  experience_id: Joi.number().required(),
});
export const DeleteExperience = async (req, res) => {
  const { error, value } = ExperienceSchema.validate(req.params);
  try {
    if (error) {
    }

    const Query = "DELETE FROM experience WHERE id = ?";
    const Value = [value.experience_id];

    await DB.query(Query, Value);

    return res.status(200).json({
      statusbar: "success",
      message: "Deleted Successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      statusbar: "error",
      message: err.message || String(err),
    });
  }
};
