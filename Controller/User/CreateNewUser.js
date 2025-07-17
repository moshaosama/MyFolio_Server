import DB from "../../ConnectDB/DB.js";
import { CreateLinks } from "../Navbar/CreateLinks.js";

export const CreateNewUser = async (req, res) => {
  try {
    const Query = "INSERT INTO user (Name, Bio) VALUES (?, ?)";
    const Value = [
      "Mohamed Osama",
      "👨‍💻Full Stack Developer with expertise in React.js, React Native, Node.js & MongoDB. Passionate about building performant, scalable apps that solve real business needs.🏆 Experienced in AJAX, React Query, Express, and writing clean, maintainable code.🌱",
    ];

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
