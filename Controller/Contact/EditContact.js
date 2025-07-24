import DB from "../../ConnectDB/DB.js";

export const EditContact = async (req, res) => {
  try {
    const body = req.body;

    if (!body.user_id || !body) {
      return res.status(404).json({
        statusbar: "error",
        error: "data is required",
      });
    }

    const Query = `UPDATE contact_us SET ${
      Object.keys(body)[0]
    } = ? WHERE user_id = ?`;
    const Value = [Object.values(body)[0], body.user_id];

    await DB.query(Query, Value);

    return res.status(200).json({
      statusbar: "success",
      message: "Contact updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      statusbar: "error",
      message: err.message || String(err),
    });
  }
};
