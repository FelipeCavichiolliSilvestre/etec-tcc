const { ServiceError } = require("./ServiceError");

class ImpossibleActionError extends ServiceError {}

module.exports = { ImpossibleActionError };
