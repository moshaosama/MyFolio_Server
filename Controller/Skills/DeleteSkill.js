import Joi from "joi";
import DB from "../../ConnectDB/DB.js";

const SkillSchema = Joi.object({
  skill_id: Joi.number().required(),
});

export const DeleteSkill = async (req, res) => {
  const { value, error } = SkillSchema.validate(req.params);
  try {
    if (error || !value.skill_id) {
      return res.status(404).json({
        statusbar: "error",
        message: "data is required",
      });
    }
    const Query = "DELETE FROM skills WHERE id = ?";
    const Value = [value.skill_id];
    await DB.query(Query, Value);

    return res.status(200).json({
      statusbar: "success",
      message: "Deleted Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      statusbar: "error",
      message: err.message || String(err),
    });
  }
};
