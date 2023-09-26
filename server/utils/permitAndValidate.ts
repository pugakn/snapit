import * as Joi from 'https://esm.sh/joi@17.10.2';
import { Err } from "./server.ts";

/*
 * Please note the following features are BREAKING CHANGES from the previous permit:
 * - trim: you must apply trim to each property via `transform: trim`
 * - empty strings need to be manually coerced to null `emptyIsNull: true`
 * - dates: {type: 'date'} isn't supported. Use 'date-time' format instead.
 */

export default function permitAndValidate<T>(data: T, schema: Joi.Schema): T {
  const { error, value } = schema.validate(data, { stripUnknown: true });
  if (error) {
    throw new Err("requiredParams", error.details);
  }
  return value;
}
