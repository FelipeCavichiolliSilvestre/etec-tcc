const Joi = require("joi");
const { JoiValidator } = require("../../shared/JoiValidator");
const gridConfig = require("../../config/grid-config");
const UserJoi = require("../users/UserJoi");

class ScheduleServiceValidator extends JoiValidator {
  validateExportsProfessorSchedules(data) {
    return this.validate(exportsProfessorSchedulesSchema, data);
  }

  validateCreateProfessorSchedule(data) {
    return this.validate(createProfessorScheduleSchema, data);
  }

  validateRetrieveLatestScheduleOfProfessor(data) {
    return this.validate(retrieveLatestScheduleOfProfessorSchema, data);
  }
}

const exportsProfessorSchedulesSchema = Joi.object({
  userIds: Joi.array().items(Joi.number().integer()),
  startDate: Joi.date(),
  endDate: Joi.date(),
});

const createProfessorScheduleSchema = Joi.object({
  userId: Joi.number().integer().required(),
  schedules: Joi.array().items(
    Joi.object({
      lesson: Joi.number()
        .min(0)
        .max(gridConfig.lessonQtd - 1)
        .required(),
      dayOfWeek: Joi.number()
        .min(0)
        .max(gridConfig.daysQtd - 1)
        .required(),
      available: Joi.boolean().default(true),
    })
  ),
  auth: UserJoi.jwt.required(),
});

const retrieveLatestScheduleOfProfessorSchema = Joi.object({
  userId: UserJoi.id.required(),
});

module.exports = { ScheduleServiceValidator };
