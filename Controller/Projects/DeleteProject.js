import Joi from "joi";
import DB from "../../ConnectDB/DB.js";

const ProjectSchema = Joi.object({
  project_id: Joi.number().required(),
});

export const DeleteProject = async (req, res) => {
  const { value, error } = ProjectSchema.validate(req.params);
  try {
    if (error) {
      return res.status(404).json({
        statusbar: "error",
        message: "Data is required",
      });
    }

    const Query = "DELETE FROM projects WHERE id = ? ";
    const Value = [value.project_id];

    await DB.query(Query, Value);

    return res.status(200).json({
      statusbar: "success",
      message: "Deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      statusbar: "error",
      message: err.message || String(err),
    });
  }
};
