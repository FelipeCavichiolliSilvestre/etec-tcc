const Joi = require("joi");
const { JoiValidator } = require("../../shared/JoiValidator");
const UserJoi = require("../users/UserJoi");

class DeadlineServiceValidator extends JoiValidator {
  validateCreateDeadline(data) {
    return this.validate(createDeadlineSchema, data);
  }

  validateDeleteDeadline(data) {
    return this.validate(deleteDeadlineSchema, data);
  }

  validateGetDeadlines(data) {
    return this.validate(getDeadlinesSchema, data);
  }

  validateGetDealineStatus(data) {
    return this.validate(getDealineStatusSchema, data);
  }

  validateUpdateDeadline(data) {
    return this.validate(updateDeadlineSchema, data);
  }
}

const createDeadlineSchema = Joi.object({
  fromDate: Joi.date().required(),
  toDate: Joi.date().required(),
  auth: UserJoi.jwt.required(),
});

const getDealineStatusSchema = Joi.object({
  id: Joi.number().integer().required(),
});

const getDeadlinesSchema = Joi.object({
  page: Joi.number().integer().min(0).default(0),
  limit: Joi.number().integer().min(1).max(20).default(10),
});

const deleteDeadlineSchema = Joi.object({
  id: Joi.number().integer().required(),
  auth: UserJoi.jwt.required(),
});

const updateDeadlineSchema = Joi.object({
  id: Joi.number().integer().required(),
  fromDate: Joi.date(),
  toDate: Joi.date(),
  auth: UserJoi.jwt.required(),
});

module.exports = { DeadlineServiceValidator };
