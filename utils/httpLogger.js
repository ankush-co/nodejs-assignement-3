const httpLogger = (req, res, message = "") => {
  return `${req.method} - ${req.baseUrl}${req.url} | ${
    res ? res?.statusCode : ""
  } ${message}`;
};

module.exports = httpLogger;
