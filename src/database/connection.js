const { thunkify, curry, is, compose } = require("ramda");
const assert = require("./../error");
const { MongoClient } = require("mongodb");
const { fromCollection } = require("./query");

let defaultConnection = null;

const checkDefaultConnection = () => {
  if (!defaultConnection) {
    throw new Error("Default database connection are not initiated");
  }
};
const isConnected = client => client.isConnected();
const collection = (database, colectionName) => {
  assert(is(String, colectionName), "Colection Name must be a string");
  return fromCollection(database.collection(colectionName));
};
const model = (client, database, schema) => {
  assert(is(Object, schema), "Schema must be an object");
};
const getFacade = (client, database) => ({
  isConnected: thunkify(isConnected)(client, database),
  collection: curry(collection)(database),
  model: curry(model)(client, database)
});

/** @type {MongoZilla.Connection.ConnectInterface} */
const connect = (url, databaseName, options) => {
  assert(is(String, url), "Connection URL must be a string");
  assert(is(String, databaseName), "Database Name must be a string");
  return MongoClient.connect(
    url,
    { ...options, useNewUrlParser: true }
  ).then(client => {
    /** @type {MongoZilla.Connection.Instance} */
    const connection = getFacade(client, client.db(databaseName));

    if (!defaultConnection) {
      defaultConnection = connection;
    }

    return connection;
  });
};

/** @type {MongoZilla.Connection.Facade} */
const connection = {
  connect,
  isConnected() {
    if (defaultConnection) {
      return defaultConnection.isConnected();
    }
    return false;
  },
  collection: compose(
    collectionName => {
      return defaultConnection.collection(collectionName);
    },
    checkDefaultConnection
  ),
  model(schema) {
    if (defaultConnection) {
      return defaultConnection.model(schema);
    }
    throw new Error("Default database connection are not initiated");
  }
};

module.exports = Object.freeze(connection);
