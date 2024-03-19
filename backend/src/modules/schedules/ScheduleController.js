const { Controller } = require("../../shared/Controller");

class ScheduleController extends Controller {
  path = "/";
  protected = true;
  routes = [
    {
      path: "/schedules",
      method: "GET",
      handler: this.GET,
    },
    {
      path: "/users/:id/schedules",
      method: "GET",
      handler: this.GET_userId,
    },
    {
      path: "/users/:id/schedules",
      method: "POST",
      status: 201,
      handler: this.POST_userId,
    },
  ];

  constructor(scheduleService) {
    super();
    this.scheduleService = scheduleService;
  }

  async GET({ query, res }) {
    res.set("Content-Type", "text/xml");

    return await this.scheduleService.exportsProfessorSchedules(query);
  }

  async POST_userId({ body, params, jwt }) {
    return this.scheduleService.registerProfessorSchedule({
      schedules: body,
      userId: params.id,
      auth: jwt,
    });
  }

  async GET_userId({ params }) {
    return this.scheduleService.retrieveLatestScheduleOfProfessor({
      userId: params.id,
    });
  }
}

module.exports = { ScheduleController };
