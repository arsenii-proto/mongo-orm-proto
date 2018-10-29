const BaseModel = require("./BaseModel");

const Nested = proxy => {
  return BaseModel(proxy);
};

module.exports = {
  Nested
};
