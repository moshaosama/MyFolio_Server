import DB from "../../ConnectDB/DB.js";
import { GetUserId } from "../User/GetUserByid.js";

export const EdtiLinks = async (req, res) => {
  try {
    const Link = req.body;
    const { userId } = req.params;

    const LinkToUpdate = Object.entries(Link);

    if (LinkToUpdate.length === 0) {
      return res.status(400).json({ message: "No valid fields provided" });
    }

    const Query = `UPDATE account SET ${Object.keys(Link)[0]} = ?  WHERE id = ?`;
    const Value = [Object.values(Link)[0], userId];

    await DB.promise().query(Query, Value);

    const QueryGetUser = "SELECT * FROM account WHERE id = ?";
    const ValueGetUser = [userId];

    const [result] = await DB.promise().query(QueryGetUser, ValueGetUser);

    return res.status(200).json({
      statusbar: "success",
      user: result,
    });

    GetUserId();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
