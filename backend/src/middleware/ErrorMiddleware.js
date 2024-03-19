const { EntityNotFoundError } = require("../errors/EntityNotFoundError");
const { ImpossibleActionError } = require("../errors/ImpossibleActionError");
const { InvalidInputError } = require("../errors/InvalidInputError");
const {
  UnauthorizedActionError,
} = require("../errors/UnauthorizedActionError");

class ErrorMiddleware {
  execute(err, req, res, next) {
    if (err instanceof EntityNotFoundError) {
      return res.status(404).send({
        message: err.message,
        metadata: err.metadata,
      });
    }

    if (err instanceof InvalidInputError) {
      return res.status(400).send({
        message: err.message,
        metadata: err.metadata,
      });
    }

    if (err instanceof UnauthorizedActionError) {
      return res.status(403).send({
        message: err.message,
        metadata: err.metadata,
      });
    }

    if (err instanceof ImpossibleActionError) {
      return res.status(422).send({
        message: err.message,
        metadata: err.metadata,
      });
    }

    console.log(err);
    res.sendStatus(500);
  }
}

module.exports = { ErrorMiddleware };
