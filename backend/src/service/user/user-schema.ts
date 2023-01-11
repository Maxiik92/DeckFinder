import Joi from "joi";

export const userSchema = Joi.object().keys({
  name: Joi.string().required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
});
