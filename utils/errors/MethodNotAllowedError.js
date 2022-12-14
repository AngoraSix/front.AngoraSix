import APIError from './APIError';

class MethodNotAllowedError extends APIError {
  constructor(message = 'Method Not Allowed', resource = 'RESOURCE', ...args) {
    super(message, `${resource}_METHOD_NOT_ALLOWED`, 405, true, ...args);
  }
}

export default MethodNotAllowedError;
