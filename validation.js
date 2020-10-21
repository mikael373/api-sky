const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    nome: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    senha: Joi.string().min(6).max(1024).required(),
    telefones: Joi.array().items(
        {
          numero: Joi.string(),
          ddd: Joi.string()
        }
    )
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    senha: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
};
