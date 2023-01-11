import log from "../../logger";
import { ObjectPropertiesSchema, ValidationError } from "joi";
import joi from "joi";

export async function inputValidation(
  schema: ObjectPropertiesSchema,
  input: any
): Promise<boolean> {
  try {
    const compiledSchema = joi.compile(schema);
    await compiledSchema.validateAsync(input);
  } catch (err) {
    if (err instanceof ValidationError) {
      log.error("Input provided is not valid. Error: " + err);
      return false;
    }
  }
  return true;
}
