const { InvalidInputError } = require("../errors/InvalidInputError");

class JoiValidator {
  validate(schema, data = {}) {
    const { value, error } = schema.required().validate(data, {
      stripUnknown: true,
      abortEarly: false,
      convert: true,
    });

    if (error) {
      const errorList = error.details.map((error) => {
        return error.message.replace(/"/g, "");
      });

      throw new InvalidInputError(errorList);
    }
    if (value === undefined)
      throw new Error("Both value and error is undefined");

    return value;
  }
}

module.exports = { JoiValidator };
