const { EntityNotFoundError } = require("./EntityNotFoundError");
const { ImpossibleActionError } = require("./ImpossibleActionError");
const { InvalidInputError } = require("./InvalidInputError");
const { UnauthorizedActionError } = require("./UnauthorizedActionError");

module.exports = {
  EntityNotFoundError,
  ImpossibleActionError,
  InvalidInputError,
  UnauthorizedActionError,
};
