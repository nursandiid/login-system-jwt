import Joi from 'joi'

const registerValidation = Joi.object({
  name: Joi.string().min(3).max(100),
  email: Joi.string().email().min(6).max(255),
  password: Joi.string().min(6).max(255),
})

const loginValidation = Joi.object({
  email: Joi.string().email().min(6).max(255),
  password: Joi.string().min(6).max(255),
})

export { registerValidation, loginValidation }
