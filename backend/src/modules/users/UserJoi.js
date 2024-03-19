const Joi = require("joi");

const id = Joi.number().integer();
const role = Joi.string().valid("PROFESSOR", "ADMIN");

module.exports = {
  id: id,
  role: role,
  name: Joi.string().min(2).max(100),
  email: Joi.string().email().min(5).max(100),
  jwt: Joi.object({
    id: id.required(),
    role: role.required(),
  }),
};
