import Joi from "joi";
import DB from "../../ConnectDB/DB.js";
import { defaultNavbarLinks } from "../../Constant/NavbarLinks.js";

const NavbarSchema = Joi.object({
  userId: Joi.number().required(),
});

export const CreateLinks = async (req, res) => {
  try {
    const { value, error } = NavbarSchema.validate(req.body);

    if (error) {
      return res.status(404).json({
        statusbar: "error",
        message: "Data is required",
      });
    }
    const Query = "INSERT INTO navbar (Links, user_id) VALUES (?, ?)";
    const Value = [JSON.stringify(defaultNavbarLinks), value.userId];

    await DB.query(Query, Value);

    return res.status(200).json({
      statusbar: "success",
      message: "Links updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      statusbar: "error",
      message: err.message || String(err),
    });
  }
};
