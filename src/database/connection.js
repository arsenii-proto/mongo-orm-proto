const { MongoClient } = require("mongodb");

/** @type {MongoZilla.Connection.Instance} */
let defaultConnetion = null;

defaultConnetion;

module.exports = {
  create(url, options) {
    const client = new MongoClient(url, options);
    const con = {
      model(schema) {
        return () => schema || client;
      },
      connected() {
        return false;
      }
    };

    if (!defaultConnetion) {
      defaultConnetion = con;
    }

    return con;
  },

  model(schema) {
    if (defaultConnetion && defaultConnetion.connected()) {
      return defaultConnetion.model(schema);
    }

    throw new Error("There are not any active database connection");
    // TODO: Write more eligible error message
  },

  connected() {
    return (defaultConnetion && defaultConnetion.connected()) || false;
  },

  database() {
    if (defaultConnetion && defaultConnetion.connected()) {
      return defaultConnetion.database();
    }

    throw new Error("There are not any active database connection");
    // TODO: Write more eligible error message
  },

  collection(...args) {
    if (defaultConnetion && defaultConnetion.connected()) {
      return defaultConnetion.collection.appy(null, args);
    }

    throw new Error("There are not any active database connection");
    // TODO: Write more eligible error message
  },

  reconect() {
    if (defaultConnetion) {
      if (!defaultConnetion.connected()) {
        return defaultConnetion.reconect();
      }

      throw new Error("Current database connection are conected");
      // TODO: Write more eligible error message
    }

    throw new Error("There are not any database connection");
    // TODO: Write more eligible error message
  },

  close() {
    if (defaultConnetion && defaultConnetion.connected()) {
      return defaultConnetion.close();
    }

    throw new Error("There are not any active database connection");
    // TODO: Write more eligible error message
  }
};
