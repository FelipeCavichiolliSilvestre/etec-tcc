const { ServiceError } = require("./ServiceError");

class UnauthorizedActionError extends ServiceError {}

module.exports = { UnauthorizedActionError };
