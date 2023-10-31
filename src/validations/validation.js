import Joi from 'joi'

const validate = (schema, request) => {
  const validated = schema.validate(request, {
    abortEarly: false,
  })

  if (validated.error) {
    throw new Joi.ValidationError(validated.error.message, validated.error.details)
  }

  return validated.value
}

export default validate
