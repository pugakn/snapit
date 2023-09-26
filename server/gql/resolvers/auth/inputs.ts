import Joi from "https://esm.sh/joi@17.10.2";

export const ProfileSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
  username: Joi.string().required(),
  avatar: Joi.string().max(10485760).optional().messages({
    "string.max": "Image size should be less than or equal to 10MB",
    "any.required": "Please upload an image",
  }),
});
