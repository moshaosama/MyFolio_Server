import Joi from "joi";

const ChatSchema = Joi.object({
  message: Joi.string().required(),
  session: Joi.string().required(),
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

    const { message, session } = value;

    if (message.startsWith("My Name is ")) {
      const name = message.slice("My Name is ".length);

      return res.status(200).json({
        statusbar: "success",
        message: `Hello ${name}, nice to meet you!`,
      });
    }

    // لو مفيش اسم
    return res.status(200).json({
      statusbar: "success",
      message:
        "I'm still learning. Can you try saying your name like 'My Name is Mohamed'?",
    });
  } catch (err) {
    return res.status(500).json({
      statusbar: "error",
      message: err.message || "Server error",
    });
  }
};
