import { UserSchema } from "./getLinks.js";

export const UpdateImageUser = async (req, res) => {
  try {
    const { error, value } = UserSchema.validate(req.params);
    if (error) {
      return res.status(400).json({
        statusbar: "error",
        message: "Invalid userId",
        details: error.details,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        statusbar: "error",
        message: "Image file is required (field name must be 'image')",
      });
    }

    const imagePath = req.file.filename;

    const updateQuery = "UPDATE account SET image = ? WHERE id = ?";
    await DB.query(updateQuery, [imagePath, value.userId]);

    const [rows] = await DB.query("SELECT * FROM account WHERE id = ?", [
      value.userId,
    ]);

    return res.status(200).json({
      statusbar: "success",
      user: rows?.[0] ?? null,
    });
  } catch (err) {
    console.error("UpdateImageUser error:", err);
    return res.status(500).json({
      statusbar: "error",
      message: err.message || String(err),
    });
  }
};
