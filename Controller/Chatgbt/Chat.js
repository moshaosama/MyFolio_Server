import Joi from "joi";

const ChatSchema = Joi.object({
  message: Joi.string().required(),
  session: Joi.string().required(),
});

export const SendMessage = async (req, res) => {
  try {
    const { value, error } = ChatSchema.validate(req.body);

    if (error) {
      return res.status(404).json({
        statusbar: "error",
        message: "Data is required",
      });
    }

    if (value.message === "My Name is") {
      return res.status(200).json({
        statusbar: "success",
        message: `Hello ${value.message.slice(11)}`,
      });
    }
  } catch (err) {}
};
