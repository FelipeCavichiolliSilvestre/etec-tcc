class AuthMiddleware {
  constructor(jwtService) {
    this.jwtService = jwtService;
  }

  execute(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).send({ message: "Bearer token is not present" });
      return;
    }

    const token = authHeader.slice(7);
    if (!token) {
      res.status(401).send({ message: "Bearer token is malformated" });
      return;
    }

    this.jwtService
      .verifyJwt(token)
      .then((jwt) => {
        req.jwt = jwt;

        next();
      })
      .catch(next);
  }
}

module.exports = { AuthMiddleware };
