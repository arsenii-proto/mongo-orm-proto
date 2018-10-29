const { BaseModel } = require("./BaseModel");
const R = require("ramda");
const Nested = options => {
  return BaseModel(options);
};

module.exports = {
  Nested
};
