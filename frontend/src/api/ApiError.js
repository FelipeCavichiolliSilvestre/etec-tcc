class ApiError extends Error {
  name = 'ApiError';

  constructor(message) {
    super(message);
  }
}

export default ApiError;
