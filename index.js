const mongoose = require("mongoose");
const mongodbUri = require("mongodb-uri");
const mquery = require("mquery");

/** @type {MongoZilla.Facade} */
const mongozilla = {
  name: "mongozilla",
  connect(url, name, options) {
    const uri = mongodbUri.formatMongoose(
      mongodbUri.format({ ...mongodbUri.parse(url), database: name })
    );

    return mongoose.createConnection(uri, options).then(connection => {
      return {
        isConnected() {
          return connection.readyState === 1;
        },
        collection(name) {
          const collection = connection.collection(name);

          return mquery(collection);
        }
      };
    });
  },
  isConnected() {
    return mongoose.connection.readyState === 1;
  },
  collection(name) {
    if (mongoose.connection.readyState === 1) {
      const collection = mongoose.connection.collection(name);

      return mquery(collection);
    }

    throw new Error("Default database connection are not initiated");
  }
};

module.exports = Object.freeze(mongozilla);
