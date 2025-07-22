import DB from "../../ConnectDB/DB.js";
import { v4 as uuidv4 } from "uuid";

export const StartChat = async (req, res) => {
  try {
    const sessionId = uuidv4();

    const Query = "INSERT INTO chatgbt (session_id) VALUES (?)";
    const Value = [sessionId];

    await DB.promise().query(Query, Value);

    return res.status(200).json({
      statusbar: "success",
      session_id: sessionId,
      message:
        "Hi there! 👋 I'm your virtual assistant. Let’s get started — what’s your name?",
    });
  } catch (err) {
    return res.status(500).json({
      statusbar: "error",
      message: err.message || String(err),
    });
  }
};
