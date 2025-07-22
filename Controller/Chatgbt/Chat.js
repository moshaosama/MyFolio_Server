import Joi from "joi";

const ChatSchema = Joi.object({
  message: Joi.string().required(),
  session: Joi.string().required(),
});

const DefaultMessages = [
  { message: "My name is " },
  { message: "Name is " },
  { message: "I am " },
  { message: "I'm " },
  { message: "is " },
];

export const SendMessage = async (req, res) => {
  try {
    const { value, error } = ChatSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        statusbar: "error",
        message: "Invalid data",
      });
    }

    const { message, session } = value;

    const matchedPhrase = DefaultMessages.find((prefix) =>
      message.startsWith(prefix.message)
    );

    if (matchedPhrase) {
      const name = message.slice(matchedPhrase.message.length).trim();

      if (!name) {
        return res.status(200).json({
          statusbar: "success",
          message: "I didn’t catch your name. Could you repeat it?",
        });
      }

      return res.status(200).json({
        statusbar: "success",
        message: `Hello ${name}, nice to meet you!`,
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
