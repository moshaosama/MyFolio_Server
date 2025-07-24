import DB from "../../ConnectDB/DB.js";

export const GetSkillProject = async (req, res) => {
  try {
    const project_id = req.params;

    const Query = "SELECT * FROM skill_project WHERE project_id  = ?";

    const Value = [project_id];

    const [result] = await DB.query(Query, Value);

    return res.status(200).json({
      statusbar: "ssuccess",
      result,
    });
  } catch (err) {
    return res.status(500).json({
      statusbar: "error",
      message: err.message || String(err),
    });
  }
};
