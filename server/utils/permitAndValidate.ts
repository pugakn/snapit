import Ajv, { Schema } from 'https://esm.sh/ajv'
import { Err } from "./server.ts";
import addValidation from "./addValidation.ts";


const ajv = new Ajv({ removeAdditional: 'all' })
addValidation(ajv)

/**
 * Validates, coerces, and permits data following a JSON Schema.
 *
 * Please note the following features are BREAKING CHANGES from the previous permit:
 * - trim: you must apply trim to each property via `transform: trim`
 * - empty strings need to be manually coerced to null `emptyIsNull: true`
 * - dates: {type: 'date'} isn't supported. Use 'date-time' format instead.
 */

function permitAndValidate<T>(data: T, schema: Schema): T {
  const validate = ajv.compile(schema)
  // Run validation twice to validate coerced data from addKeywords
  const validateRoundTwo = ajv.compile(schema)
  const isValid = validate(data) && validateRoundTwo(data)
  if (!isValid) {
    throw new Err(
      'requiredParams',
      validate.errors || (validateRoundTwo.errors as any)
    )
  }
  return data
}

export default permitAndValidate