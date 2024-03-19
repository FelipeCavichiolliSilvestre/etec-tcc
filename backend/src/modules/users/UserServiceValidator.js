const Joi = require("joi");
const UserJoi = require("./UserJoi");
const { JoiValidator } = require("../../shared/JoiValidator");

class UserServiceValidator extends JoiValidator {
  validateCreateUser(data) {
    return this.validate(createUserSchema, data);
  }

  validateUpdateUser(data) {
    return this.validate(updateUserSchema, data);
  }

  validateDeleteUser(data) {
    return this.validate(deleteUserSchema, data);
  }

  validateGetOneUser(data) {
    return this.validate(getOneUserSchema, data);
  }

  validateGetManyUsers(data) {
    return this.validate(getManyUsersSchema, data);
  }

  validateLoginUser(data) {
    return this.validate(loginUserSchema, data);
  }
}

const createUserSchema = Joi.object({
  auth: UserJoi.jwt.required(),
  role: UserJoi.role.default("PROFESSOR"),
  name: UserJoi.name.required(),
  email: UserJoi.email.required(),
});

const updateUserSchema = Joi.object({
  auth: UserJoi.jwt.required(),
  id: UserJoi.id.required(),
  role: UserJoi.role,
  name: UserJoi.name,
  email: UserJoi.email,
});

const deleteUserSchema = Joi.object({
  auth: UserJoi.jwt.required(),
  id: UserJoi.id.required(),
});

const loginUserSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

const getOneUserSchema = Joi.object({
  id: UserJoi.id.required(),
});

const getManyUsersSchema = Joi.object({
  page: Joi.number().integer().min(0).default(0),
  limit: Joi.number().integer().min(1).max(20).default(10),
  role: UserJoi.role,
});

module.exports = { UserServiceValidator };
