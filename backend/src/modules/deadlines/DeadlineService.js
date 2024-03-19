const {
  UnauthorizedActionError,
  ImpossibleActionError,
  EntityNotFoundError,
} = require("../../errors");

class DeadlineService {
  constructor(deadlineRepository, userRepository, validator) {
    this.deadlineRepository = deadlineRepository;
    this.userRepository = userRepository;
    this.validator = validator;
  }

  async getDeadlines(data) {
    const { page, limit } = this.validator.validateGetDeadlines(data);

    return this.deadlineRepository.findMany({
      offset: page * limit,
      limit,
    });
  }

  async getOngoingDeadlines() {
    return this.deadlineRepository.findDeadlinesBetweenDate(new Date());
  }

  async createDeadline(data) {
    const { fromDate, toDate, auth } =
      this.validator.validateCreateDeadline(data);

    if (auth.role !== "ADMIN") {
      throw new UnauthorizedActionError("Only admins can create deadlines");
    }

    const deadlineId = await this.deadlineRepository.createOne({
      fromDate,
      toDate,
    });

    return this.deadlineRepository.findOneById(deadlineId);
  }

  async getDealineStatus(data) {
    const { id } = this.validator.validateGetDealineStatus(data);

    const deadline = await this.deadlineRepository.findOneById(id);
    if (!deadline) throw new EntityNotFoundError("Deadline");

    const users =
      await this.userRepository.findAllUsersWithSchedulesCreatedBetween({
        startDate: deadline.fromDate,
        endDate: deadline.toDate,
      });

    return {
      ...deadline,
      users,
    };
  }

  async deleteDeadline(data) {
    const { id, auth } = this.validator.validateDeleteDeadline(data);

    if (auth.role !== "ADMIN") {
      throw new UnauthorizedActionError("Only admins can delete deadlines");
    }
    const deadline = await this.deadlineRepository.findOneById(id);
    if (!deadline) throw new EntityNotFoundError("Deadline");

    await this.deadlineRepository.deleteOneById(id);
  }

  async updateDeadline(data) {
    const { id, fromDate, toDate, auth } =
      this.validator.validateUpdateDeadline(data);

    if (auth.role !== "ADMIN") {
      throw new UnauthorizedActionError("Only admins can update deadlines");
    }
    const dealineExists = await this.deadlineRepository.findOneById(id);
    if (!dealineExists) throw new EntityNotFoundError("Deadline");

    const deadlineId = await this.deadlineRepository.updateOneById(id, {
      fromDate,
      toDate,
    });

    await this.deadlineRepository.findOneById(id);
  }
}

module.exports = { DeadlineService };
