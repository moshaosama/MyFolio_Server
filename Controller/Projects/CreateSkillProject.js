import DB from "../../ConnectDB/DB.js";

export const CreateSkillProject = async (req, res) => {
  try {
    const { project_id, skill_name } = req.body;

    if (!project_id || !skill_name) {
      return res.status(400).json({
        statusbar: "error",
        message: "project_id and skill_name are required",
      });
    }

    const Query =
      "INSERT INTO skill_project (skill_name, project_id) VALUES (?, ?)";
    const Values = [skill_name, project_id];

    const [result] = await DB.query(Query, Values);

    return res.status(201).json({
      statusbar: "success",
      message: "Created Successfully!",
      insertedId: result.insertId,
    });
  } catch (err) {
    return res.status(500).json({
      statusbar: "error",
      message: err.message || String(err),
    });
  }
};
