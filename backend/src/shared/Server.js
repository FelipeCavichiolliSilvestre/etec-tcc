class Server {
  constructor(app, port, authMiddleware) {
    this.app = app;
    this.port = port;
    this.authMiddleware = authMiddleware;
  }

  run() {
    this.app.listen(this.port, () =>
      console.log(`Listening at http://localhost:${this.port}`)
    );
  }

  loadControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use(
        controller.path,
        controller.getRouter(
          this.authMiddleware.execute.bind(this.authMiddleware)
        )
      );
    });
  }

  loadGlobalMiddlewares(middlewares) {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  loadErrorHandler(handler) {
    this.app.use(handler);
  }
}
module.exports = { Server };
