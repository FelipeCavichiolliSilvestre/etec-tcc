const { XmlExporter } = require("./XmlExporter");
const {
  UnauthorizedActionError,
  EntityNotFoundError,
} = require("../../errors");

class ScheduleService {
  constructor(
    scheduleRepository,
    deadlineRepository,
    userRepository,
    validator,
    options
  ) {
    this.scheduleRepository = scheduleRepository;
    this.deadlineRepository = deadlineRepository;
    this.userRepository = userRepository;
    this.validator = validator;
    this.options = options;
  }

  async exportsProfessorSchedules(data) {
    const { startDate, endDate, userIds } =
      this.validator.validateExportsProfessorSchedules(data);

    const schedules =
      await this.scheduleRepository.findSchedulesOfProfessorsBetweenDate({
        startDate,
        endDate,
        userIds,
      });

    const exporter = new XmlExporter(schedules, {
      lessonQtd: this.options.lessonQtd,
      daysQtd: this.options.daysQtd,
    });

    return exporter.export();
  }

  async registerProfessorSchedule(data) {
    const { userId, schedules, auth } =
      this.validator.validateCreateProfessorSchedule(data);

    if (auth.role !== "ADMIN" && auth.id !== userId) {
      throw new UnauthorizedActionError(
        "Can not modify the schedule of another teacher"
      );
    }

    const userExists = await this.userRepository.findOneById(userId);
    if (!userExists) throw new EntityNotFoundError("User", { "..": 1 });

    await this.scheduleRepository.createMany(
      schedules.map((data) => ({ ...data, userId }))
    );
  }

  async retrieveLatestScheduleOfProfessor(data) {
    const { userId } =
      this.validator.validateRetrieveLatestScheduleOfProfessor(data);

    const schedules =
      await this.scheduleRepository.findLatestsSchedulesOfProfessor(userId);

    return schedules;
  }
}

module.exports = { ScheduleService };
