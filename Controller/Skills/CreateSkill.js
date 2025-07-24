import Joi from "joi";
import DB from "../../ConnectDB/DB.js";
import { UserSchema } from "../GetDataByuserId/getLinks.js";

const SkillSchema = Joi.object({
  skill_name: Joi.string().required(),
});

export const CreateSkill = async (req, res) => {
  try {
    const { value: ValueSkills } = SkillSchema.validate(req.body);
    const { value: ValueUser } = UserSchema.validate(req.body);

    const Query = "INSERT INTO skills (skills, user_id) VALUES (?,?)";
    const Value = [ValueSkills.skill_name, ValueUser.userId];

    await DB.query(Query, Value);

    return res.status(200).json({
      statusbar: "success",
      message: "Created Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      statusbar: "error",
      message: err.message || String(err),
    });
  }
};
