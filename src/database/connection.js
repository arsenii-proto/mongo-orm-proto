const { MongoClient } = require("mongodb");
const queryByCollection = require("./query");

let defaultConnection = null;
/** @type {MongoZilla.Connection.ConnectInterface} */
const connect = (url, databaseName, options) =>
  MongoClient.connect(
    url,
    options
  ).then(client => {
    const databse = client.db(databaseName);
    /** @type {MongoZilla.Connection.Instance} */
    const connection = {
      isConnected() {
        return client.isConnected();
      },
      collection(colectionName) {
        return queryByCollection(databse.collection(colectionName));
      }
    };

    if (!defaultConnection) {
      defaultConnection = connection;
    }

    return connection;
  });

/** @type {MongoZilla.Connection.Facade} */
const connection = {
  connect,
  isConnected() {
    if (defaultConnection) {
      return defaultConnection.isConnected();
    }
    return false;
  },
  collection(collectionName) {
    if (defaultConnection) {
      return defaultConnection.collection(collectionName);
    }
    throw new Error("Default database connection are not initiated");
  }
};

module.exports = Object.freeze(connection);
