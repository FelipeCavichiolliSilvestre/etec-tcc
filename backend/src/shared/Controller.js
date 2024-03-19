const { Router } = require("express");
const { Stream } = require("stream");
const { ExpressFile } = require("./ExpressFile");

class Controller {
  middlewares = [];
  protected = false;
  routes = [];
  path = "/";

  getRouter(authMiddleware) {
    const router = new Router();

    this.routes.forEach((route) => {
      const middlewares = [];

      if (this.protected || route.protected) {
        middlewares.push(authMiddleware);
      }
      middlewares.push(...this.middlewares);
      if (route.middlewares) {
        middlewares.push(...route.middlewares);
      }

      const routeHandler = (req, res, next) => {
        route.handler
          .bind(this)({
            query: req.query,
            body: req.body,
            params: req.params,
            jwt: req.jwt,
            res,
            req,
          })
          .then((result) => {
            res.status(route.status ?? 200);

            if (result instanceof ExpressFile) result.pipeToRes(res);
            else res.send(result ?? null);
          })
          .catch(next);
      };

      router[route.method.toLowerCase()](
        route.path,
        ...middlewares,
        routeHandler
      );
    });

    return router;
  }
}

module.exports = { Controller };
