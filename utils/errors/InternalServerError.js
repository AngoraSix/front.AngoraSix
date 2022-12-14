import APIError from './APIError';

class InternalServerError extends APIError {
  constructor(message = 'Something went wrong', resource = 'SERVER', ...args) {
    super(message, `${resource}_ERROR`, 500, true, ...args);
  }
}

export default InternalServerError;
