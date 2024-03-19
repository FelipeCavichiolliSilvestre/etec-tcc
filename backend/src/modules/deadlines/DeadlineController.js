const { Controller } = require("../../shared/Controller");

class DeadlineController extends Controller {
  path = "/deadlines";
  protected = true;
  routes = [
    {
      path: "/",
      method: "GET",
      handler: this.GET,
    },
    {
      path: "/",
      method: "POST",
      handler: this.POST,
      status: 201,
    },
    {
      path: "/:id",
      method: "GET",
      handler: this.GET_id,
    },
    {
      path: "/:id",
      method: "DELETE",
      handler: this.DELETE_id,
      status: 204,
    },
    {
      path: "/:id",
      method: "PATCH",
      handler: this.PATCH_id,
      status: 204,
    },
  ];

  constructor(deadlineService) {
    super();
    this.deadlineService = deadlineService;
  }

  async GET({ query }) {
    return this.deadlineService.getDeadlines(query);
  }

  async POST({ body, jwt }) {
    return this.deadlineService.createDeadline({ ...body, auth: jwt });
  }

  async GET_id({ params }) {
    return this.deadlineService.getDealineStatus({ id: params.id });
  }

  async PATCH_id({ params, jwt, body }) {
    return this.deadlineService.updateDeadline({
      ...body,
      id: params.id,
      auth: jwt,
    });
  }

  async DELETE_id({ params, jwt }) {
    return this.deadlineService.deleteDeadline({ id: params.id, auth: jwt });
  }
}

module.exports = { DeadlineController };
