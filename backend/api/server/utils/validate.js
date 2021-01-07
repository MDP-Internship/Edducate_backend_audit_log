import Joi from "joi"
export function registerValidate(object) {
  const registerSchema = Joi.object({
    name: Joi.string().required().min(3),
    surname: Joi.string().required().min(3),
    email: Joi.string().required().min(3),
    password: Joi.string().required().min(6),
    
  })

  const result = registerSchema.validate(object, { abortEarly: false })

  if (result.error) {
    return {
      type: false,
      error: {
        message: result.error.message,
        value: result.error.details[0].context.value,
      },
    }
  }
  return {
    type: true,
  }
}

export function loginValidate(object) {
  const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required().min(6),
  })
  const result = loginSchema.validate(object, { abortEarly: false })
  if (result.error) {
    return {
      type: false,
      error: {
        message: result.error.message,
        value: result.error.details[0].context.value,
      },
    }
  }

  return {
    type: true,
  }
}
