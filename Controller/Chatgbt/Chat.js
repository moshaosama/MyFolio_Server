import Joi from "joi";
import DB from "../../ConnectDB/DB.js";
import { DefaultMessage } from "../../Constant/Messages.js";

const ChatSchema = Joi.object({
  message: Joi.string().required(),
  session: Joi.string().required(),
  user_id: Joi.number().required(),
});

export const SendMessage = async (req, res) => {
  try {
    const { value, error } = ChatSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        statusbar: "error",
        message: "Invalid data",
      });
    }

    const { message, session, user_id } = value;

    const cleanedMessage = message.trim().toLowerCase();
    const matchedPhrase = DefaultMessage.Name.find((prefix) =>
      cleanedMessage.startsWith(prefix.message.toLowerCase())
    );

    const BioMatchedPhase = DefaultMessage.Condition.find((phases) => {
      cleanedMessage.startsWith(phases.phase.toLowerCase());
    });

    let name;

    if (matchedPhrase) {
      name = message.slice(matchedPhrase.message.length).trim();

      if (!name) {
        return res.status(200).json({
          statusbar: "success",
          message: "I didn’t catch your name. Could you repeat it?",
        });
      }

      const Query = "UPDATE account SET Name = ? WHERE id = ?";
      const Value = [name, user_id];

      const QueryGetUser = "SELECT * FROM account WHERE id = ?";
      const ValueGetUser = [user_id];

      await DB.query(Query, Value);

      const [result] = await DB.query(QueryGetUser, ValueGetUser);
      res.status(200).json({
        statusbar: "success",
        message: `Hello ${name}, nice to meet you! Do you want to make any changes to your bio?`,
        user: result,
      });
    }

    return res.status(200).json({
      statusbar: "success",
      message: "I'm still learning. What’s your name?",
    });
  } catch (err) {
    return res.status(500).json({
      statusbar: "error",
      message: err.message || "Server error",
    });
  }
};
