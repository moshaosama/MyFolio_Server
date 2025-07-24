import Joi from "joi";
import { UserSchema } from "../GetDataByuserId/getLinks.js";
import DB from "../../ConnectDB/DB.js";

const ExperienceSchema = Joi.object({
  Date: Joi.string().required(),
  Title: Joi.string().required(),
  Foundation: Joi.string().required(),
  Description: Joi.string().required(),
  Icon: Joi.string().required(),
  Position: Joi.string().required(),
});

export const CreateExperience = async (req, res) => {
  const { value: ExperineceValue, error: ExperienceError } =
    ExperienceSchema.validate(req.body);

  const { value: UserValue, error: UserError } = UserSchema.validate(
    req.params
  );

  try {
    const { Date, Title, Foundation, Description, Icon, Position } =
      ExperineceValue;
    const QueryCreateExperience =
      "INSERT INTO experience (Date,Title,Foundation,Description,Icon,Position,user_id) VALUES (?,?,?,?,?,?,?)";
    const ValueCreateExperience = [
      Date,
      Title,
      Foundation,
      Description,
      Icon,
      Position,
      UserValue?.userId,
    ];

    await DB.query(QueryCreateExperience, ValueCreateExperience);

    return res.status(200).json({
      statusbar: "success",
      message: "Created successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      statusbar: "error",
      message: err.message || String(err),
    });
  }
};
