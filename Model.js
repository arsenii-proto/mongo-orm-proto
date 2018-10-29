const BaseModel = require("./BaseModel");
const Nested = require("./NestedModel");

const Model = proxy => {
  return BaseModel(proxy);
};

Model.Nested = Nested;

module.exports = {
  Model
};
