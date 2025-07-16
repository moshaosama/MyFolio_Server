import DB from "../../ConnectDB/DB.js";

export const CreateNewUser = async (req, res) => {
  try {
    const Query = "INSERT INTO user (Name) VALUES (?)";
    const Value = ["Mohamed Osama"];

    await DB.promise().query(Query, Value);
    return res.status(200).json({
      statusbar: "success",
      message: "Created Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      statusbar: "error",
      message: err,
    });
  }
};
