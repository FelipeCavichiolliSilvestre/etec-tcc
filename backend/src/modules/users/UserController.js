const { Controller } = require("../../shared/Controller");

class UserController extends Controller {
  path = "/users";
  routes = [
    {
      path: "/",
      method: "GET",
      handler: this.GET,
    },
    {
      path: "/",
      method: "POST",
      status: 201,
      handler: this.POST,
      protected: true,
    },
    {
      path: "/me",
      method: "GET",
      handler: this.GET_me,
      protected: true,
    },
    {
      path: "/search",
      method: "GET",
      handler: this.GET_search,
      protected: true,
    },
    {
      path: "/:id",
      method: "GET",
      handler: this.GET_id,
      protected: true,
    },
    {
      path: "/:id",
      method: "PATCH",
      status: 204,
      handler: this.PATCH_id,
      protected: true,
    },
    {
      path: "/:id",
      method: "DELETE",
      status: 204,
      handler: this.DELETE_id,
      protected: true,
    },
    {
      path: "/login",
      method: "POST",
      handler: this.POST_login,
    },
  ];

  constructor(userService) {
    super();
    this.userService = userService;
  }

  async GET({ query }) {
    const users = await this.userService.getManyUsers(query);

    return users;
  }

  async POST({ body, jwt }) {
    const user = await this.userService.createUser({
      ...body,
      auth: jwt,
    });

    return user;
  }

  async GET_id({ params }) {
    const user = await this.userService.getOneUser({ id: params.id });

    return user;
  }

  async GET_me({ jwt }) {
    const user = await this.userService.getOneUser({ id: jwt.id });

    return user;
  }

  async PATCH_id({ body, params, jwt }) {
    await this.userService.updateUser({
      ...body,
      id: params.id,
      auth: jwt,
    });
  }

  async DELETE_id({ params, jwt }) {
    return this.userService.deleteUser({
      id: params.id,
      auth: jwt,
    });
  }

  async POST_login({ body }) {
    return await this.userService.loginUser(body);
  }

  async GET_search({ query }) {
    return await this.userService.searchUser(query);
  }
}

module.exports = { UserController };
