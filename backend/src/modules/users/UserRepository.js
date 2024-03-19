class UserRepository {
  constructor(knex) {
    this.knex = knex;
  }

  async searchProfessors({ term, limit }) {
    const res = await this.knex("users")
      .select("id", "name", "email", "role")
      .where("name", "like", `%${term}%`)
      .orWhere("email", "like", `%${term}%`)
      .limit(limit);

    return res;
  }

  async createOne({ name, email, role, passwordHash }) {
    const res = await this.knex("users").insert({
      name,
      email,
      role,
      password_hash: passwordHash,
    });

    return res[0];
  }

  async updateOneById(id, { name, email, role, passwordHash }) {
    const affectedRows = await this.knex("users")
      .update({
        name,
        email,
        role,
        password_hash: passwordHash,
      })
      .where({ id });

    if (affectedRows === 0) return null;

    return id;
  }

  async deleteOneById(id) {
    await this.knex("users").del().where({ id });
  }

  async findFirstByNameOrEmail(value) {
    const res = await this.knex("users")
      .select("id", "name", "email", "role", "password_hash as passwordHash")
      .where({ email: value })
      .orWhere({ name: value })
      .first();

    return res === undefined ? null : res;
  }

  async emailOrNameExists({ name, email, exceptById }) {
    const query = this.knex("users").select("id");

    if (name) query.orWhere({ name });
    if (email) query.orWhere({ email });
    if (exceptById) query.andWhereNot({ id: exceptById });

    const user = await query.first();

    return user !== undefined;
  }

  async findOneById(id) {
    const res = await this.knex("users")
      .select("id", "name", "email", "role")
      .where({ id });

    if (res.length === 0) return null;

    return res[0];
  }

  async findMany({ offset, limit, role }) {
    const query = this.knex("users")
      .select("id", "name", "email", "role")
      .offset(offset)
      .limit(limit);

    if (role) query.where({ role });

    return await query;
  }

  async findAllUsersWithSchedulesCreatedBetween({ startDate, endDate }) {
    const query = this.knex("schedules")
      .distinct("schedules.user_id as id")
      .select("users.name as name")
      .join("users", "schedules.user_id", "=", "users.id")
      .where({ "users.role": "PROFESSOR" })
      .andWhere("schedules.created_at", ">=", startDate)
      .andWhere("schedules.created_at", "<", endDate);

    return await query;
  }
}

module.exports = { UserRepository };
