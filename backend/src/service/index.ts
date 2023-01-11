export { inputValidation } from "./validation/input-validation";
import Joi from "joi";

export const idSchema = Joi.number().required();
