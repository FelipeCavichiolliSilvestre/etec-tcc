const { ServiceError } = require("./ServiceError");

class InvalidInputError extends ServiceError {
  constructor(errorMessageList) {
    super("Input contains invalid data", errorMessageList);
  }
}

module.exports = { InvalidInputError };
