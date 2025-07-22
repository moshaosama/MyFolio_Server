import Joi from "joi";

const ChatSchema = Joi.object({
  message: Joi.string().required(),
  session: Joi.string().required(),
});

const DefaultMessages = [
  {
    message: "My Name s",
  },
  {
    message: "Name is",
  },
  {
    message: "",
  },
  {
    message: "is",
  },
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
      message.startsWith(prefix)
    );

    if (matchedPhrase) {
      const name = message.slice(
        DefaultMessages.filter((el) => el.message === message).length
      );

      return res.status(200).json({
        statusbar: "success",
        message: `Hello ${name}, nice to meet you!`,
      });
    }

    return res.status(200).json({
      statusbar: "success",
      message: "I'm still learning. what’s your name?",
    });
  } catch (err) {
    return res.status(500).json({
      statusbar: "error",
      message: err.message || "Server error",
    });
  }
};
