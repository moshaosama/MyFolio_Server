import DB from "../../ConnectDB/DB.js";
import { CreateLinks } from "../Navbar/CreateLinks.js";

export const CreateNewUser = async (req, res) => {
  try {
    const Query = "INSERT INTO user (Name) VALUES (?)";
    const Value = ["Mohamed Osama"];

    const [resultCraete] = await DB.promise().query(Query, Value);

    const UserQuery = "SELECT * FROM user WHERE id = ?";
    const [valueUser] = [resultCraete.insertId];

    const [resultGet] = await DB.promise().query(UserQuery, valueUser);

    return res.status(200).json({
      statusbar: "success",
      message: "Created Successfully",
      user: resultGet,
    });
  } catch (err) {
    return res.status(500).json({
      statusbar: "error",
      message: err,
    });
  }
};
