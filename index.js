const connection = require("./src/database/connection");

/** @type {MongoZilla.Facade} */
const mongozilla = {
  name: "mongozilla",
  ...connection
};

module.exports = Object.freeze(mongozilla);
