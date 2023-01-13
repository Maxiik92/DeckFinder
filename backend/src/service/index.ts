export { inputValidation } from "./validation/input-validation";
import Joi from "joi";

export const idSchema = Joi.number().required();

export const passwordSchema = Joi.string().min(8).required();
