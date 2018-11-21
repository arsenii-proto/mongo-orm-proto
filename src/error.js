class MongoZillaError extends Error {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, MongoZillaError);
    this.name = "MongoZillaError";
  }
}

module.exports = function assert(expected, value, errorMsg) {
  /* eslint-disable */
  if (!errorMsg) {
    errorMsg = value;
    expected = !!expected;
    value = true;
  }

  if (expected != value) {
    throw new MongoZillaError(errorMsg);
  }
};
