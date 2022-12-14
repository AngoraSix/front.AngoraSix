const NAME_SUFFIX_STATUS_MAP = {
  _INVALID: 400,
  _NOT_FOUND: 404,
  _METHOD_NOT_ALLOWED: 405,
  _MEDIA_NOT_SUPPORTED: 415,
  _ERROR: 500,
};

class APIError extends Error {
  constructor(
    message = 'Something went wrong',
    name = 'API_ERROR',
    status = 500,
    keepStatus = false,
    ...args
  ) {
    super(...args);

    this.status =
      keepStatus || !name ? status : _determineStatusFromName(name, status);
    this.name = name;
    this.message = message;

    Error.captureStackTrace(this, APIError);
  }

  asObject() {
    return {
      message: this.message,
      name: this.name,
      status: this.status,
    };
  }
}

function _determineStatusFromName(name, status) {
  for (const [suffix, mappedStatus] of Object.entries(NAME_SUFFIX_STATUS_MAP)) {
    if (name.endsWith(suffix)) return mappedStatus;
  }
  return status;
}

export default APIError;
