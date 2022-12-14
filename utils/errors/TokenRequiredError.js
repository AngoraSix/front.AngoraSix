import APIError from './APIError';

class TokenRequiredError extends APIError {
  constructor(message = 'Token Required Error', resource = 'TOKEN', ...args) {
    super(message, `${resource}_INVALID`, 400, true, ...args);
  }
}

export default TokenRequiredError;
