class ServiceError extends Error {
  constructor(message, metadata) {
    super(message);
    this.metadata = metadata;
  }
}

module.exports = { ServiceError };
