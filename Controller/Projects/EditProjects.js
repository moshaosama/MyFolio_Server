import Joi from "joi";
import DB from "../../ConnectDB/DB.js";

const ProjectSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  githubLink: Joi.string().required(),
  liveDemoLink: Joi.string().required(),
});

export const EditProjects = async (req, res) => {
  const { value, error } = ProjectSchema.validate(req.body);
  const { project_id } = req.params;

  if (error || !project_id) {
    return res.status(400).json({
      statusbar: "error",
      message: "Invalid input data or missing project ID",
    });
  }

  try {
    const Query = `
      UPDATE projects
      SET title = ?, description = ?, githubLink = ?, liveDemoLink = ?
      WHERE id = ?
    `;
    const { title, description, githubLink, liveDemoLink } = value;

    const Value = [title, description, githubLink, liveDemoLink, project_id];

    const [result] = await DB.promise().query(Query, Value);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        statusbar: "error",
        message: "Project not found",
      });
    }

    return res.status(200).json({
      statusbar: "success",
      message: "Project updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      statusbar: "error",
      message: err.message || String(err),
    });
  }
};
