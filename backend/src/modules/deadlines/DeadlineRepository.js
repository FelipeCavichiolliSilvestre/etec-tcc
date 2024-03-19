class DeadlineRepository {
  constructor(knex) {
    this.knex = knex;
  }

  async findOneById(id) {
    const res = await this.knex("deadlines")
      .select("id", "from_date as fromDate", "to_date as toDate")
      .where({ id });

    if (res.length === 0) return null;

    return res[0];
  }

  async findMany({ offset, limit }) {
    const res = await this.knex("deadlines")
      .select("id", "from_date as fromDate", "to_date as toDate")
      .orderBy("to_date", "desc")
      .orderBy("from_date", "desc")
      .offset(offset)
      .limit(limit);

    return res;
  }

  async findDeadlinesBetweenDate(date) {
    const res = await this.knex("deadlines")
      .select("id", "from_date as fromDate", "to_date as toDate")
      .where("from_date", "<=", date)
      .andWhere("to_date", ">=", date);

    return res;
  }

  async doesDeadlineExistsBetweenDate(date) {
    const res = await this.knex("deadlines")
      .select("id", "from_date as fromDate", "to_date as toDate")
      .where("from_date", "<=", date)
      .andWhere("to_date", ">=", date)
      .first();

    return res !== undefined;
  }

  async createOne({ fromDate, toDate }) {
    const res = await this.knex("deadlines").insert({
      from_date: fromDate,
      to_date: toDate,
    });

    return res[0];
  }

  async updateOneById(id, { fromDate, toDate }) {
    await this.knex("deadlines")
      .update({
        from_date: fromDate,
        to_date: toDate,
      })
      .where({ id });
  }

  async deleteOneById(id) {
    await this.knex("deadlines").del().where({ id });
  }
}

module.exports = { DeadlineRepository };
