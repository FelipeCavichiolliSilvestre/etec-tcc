class ScheduleRepository {
  constructor(knex) {
    this.knex = knex;
  }

  async findAllScheduleOfProfessors() {
    const query = this.knex("schedules")
      .select(
        "schedules.lesson as lesson",
        "schedules.available as available",
        "schedules.day_of_week as dayOfWeek",
        "schedules.created_at as createdAt",
        "users.name as userName"
      )
      .join("users", "users.id", "schedules.user_id")
      .where({ "users.role": "PROFESSOR" })
      .orderBy("users.name", "asc")
      .orderBy("schedules.day_of_week", "asc")
      .orderBy("schedules.lesson", "asc");

    return await query;
  }

  async findSchedulesOfProfessorsBetweenDate({
    startDate,
    endDate,
    userIds,
  } = {}) {
    const query = this.knex("schedules")
      .select(
        "schedules.lesson as lesson",
        "schedules.available as available",
        "schedules.day_of_week as dayOfWeek",
        "schedules.created_at as createdAt",
        "users.name as userName"
      )
      .join("users", "users.id", "schedules.user_id")
      .where({ "users.role": "PROFESSOR" })
      .orderBy("schedules.created_at", "asc");

    if (userIds) query.whereIn("users.id", userIds);
    if (startDate) query.where("schedules.created_at", ">", startDate);
    if (endDate) query.where("schedules.created_at", "<", endDate);

    return await query;
  }

  async createMany(schedules) {
    const now = new Date();

    return await this.knex("schedules")
      .insert(
        schedules.map(
          ({ userId, createdAt, lesson, dayOfWeek, available }) => ({
            user_id: userId,
            created_at: createdAt ?? now,
            lesson,
            day_of_week: dayOfWeek,
            available,
          })
        )
      )
      .onConflict()
      .merge(["available"]);
  }

  async findLatestsSchedulesOfProfessor(userId) {
    const query = this.knex("schedules")
      .select(
        "schedules.lesson as lesson",
        "schedules.available as available",
        "schedules.day_of_week as dayOfWeek",
        "schedules.created_at as createdAt"
      )
      .andWhere(
        "schedules.created_at",
        "=",
        this.knex("schedules")
          .max("created_at")
          .where("schedules.user_id", "=", userId)
      )
      .orderBy("schedules.created_at", "asc");

    return await query;
  }
}

module.exports = { ScheduleRepository };
