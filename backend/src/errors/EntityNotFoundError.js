const { ServiceError } = require("./ServiceError");

class EntityNotFoundError extends ServiceError {
  constructor(entityName, metadata) {
    super(entityName, metadata);
  }
}

module.exports = { EntityNotFoundError };
