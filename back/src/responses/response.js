exports.CODE = {
  SUCCESS: 200,
  NO_EFFECT: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INVALID_PARAMETERS: 405,
  INTERNAL_ERROR: 500,
};

// ref : https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP

// customError : { key: *errorKey*, message: *errorMessage* }
exports.error = (callback, code, customError = {}) => {
  let outputError = {};
  if (!customError) {
    switch (code) {
      case 400:
        outputError = { key: "BAD_REQUEST", message: "error.bad_request" };
        break;
      case 401:
        outputError = { key: "UNAUTHORIZED", message: "error.unauthorized" };
        break;
      case 403:
        outputError = { key: "FORBIDDEN", message: "error.forbidden" };
        break;
      case 404:
        outputError = { key: "NOT_FOUND", message: "error.not_found" };
        break;
      case 405:
        outputError = {
          key: "INVALID_PARAMETERS",
          message: "error.invalid_parameters",
        };
        break;
      case 500:
        outputError = {
          key: "INTERNAL_ERROR",
          message: "error.internal_error",
        };
        break;
      default:
        outputError = { key: "UNKNOWN", message: "error.unknown" };
        break;
    }
  } else if (customError && customError.sql) {
    // LOGGER DE L'ERREUR
    outputError = { key: "INTERNAL_ERROR", message: "error.internal_error" };
  } else {
    // LOGGER DE L'ERREUR
    outputError = customError;
  }
  outputError.statusCode = code;
  return callback(code, outputError);
};

exports.success = (callback, code, data = null) => {
  let outputSuccess = {};
  let outputError = {};
  switch (code) {
    case 200:
      outputError = { key: "SUCCESS", message: "error.success" };
      break;
    case 202:
      outputError = {
        key: "NO_EFFECT",
        message: "error.request_with_no_effect",
      };
      break;
  }

  outputSuccess = {
    ...outputSuccess,
    statusCode: code,
    data,
  };

  return callback(code, outputSuccess);
};

exports.send = (res, code, rows) => {
  return res.status(code).json(rows);
};
