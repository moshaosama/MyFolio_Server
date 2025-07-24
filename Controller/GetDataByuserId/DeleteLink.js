import Joi from "joi";
import DB from "../../ConnectDB/DB.js";
import { UserSchema } from "./getLinks.js";

const LinkSchema = Joi.object({
  linkName: Joi.string().required().min(3),
});

export const DeleteLink = async (req, res) => {
  const { error: userIdError, value: userValue } = UserSchema.validate(
    req.params
  );
  const { error: linkNameError, value: linkNameValue } = LinkSchema.validate(
    req.body
  );
  try {
    if (userIdError || linkNameError) {
      return res.status(404).json({
        statusbar: "error",
        message: "Data is required",
      });
    }
    const Query = "SELECT * FROM navbar WHERE user_id = ?";
    const Value = [userValue.userId];

    const [LinksResult] = await DB.query(Query, Value);
    const Links = JSON.parse(LinksResult[0]?.Links || "[]");

    if (!Links.some((link) => link.name === linkNameValue.linkName)) {
      return res.status(404).json({
        statusbar: "error",
        message: "Link not found.",
      });
    }

    const FilterationData = Links.filter(
      (data) => data.name != linkNameValue.linkName
    );

    const UpdatedLinksQuery = "UPDATE navbar SET Links = ? WHERE user_id = ?";
    const UpdatedLinksValue = [
      JSON.stringify(FilterationData),
      userValue.userId,
    ];

    await DB.query(UpdatedLinksQuery, UpdatedLinksValue);

    return res.status(200).json({
      statusbar: "success",
      message: "Updated Successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      statusbar: "error",
      message: err.message || String(err),
    });
  }
};
