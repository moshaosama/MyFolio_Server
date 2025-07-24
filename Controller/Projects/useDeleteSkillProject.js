import DB from "../../ConnectDB/DB.js";

export const DeleteSkillProject = async (req, res) => {
  try {
    const { skillProject_id } = req.params;

    if (!skillProject_id) {
      return res.status(404).json({
        statusbar: "success",
        message: "data is required",
      });
    }

    const Query = "DELETE FROM skill_project WHERE id = ?";
    const Value = [skillProject_id];

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
