const { expect } = require("chai");
const getModule = () => require("./../../../../src/database/connection");

describe("@/src/database/connection.js [MongoZilla.Connection]", () => {
  describe("connect", () => {
    it("should be a function", () => {
      const { connect } = getModule();

      expect(connect).to.be.a("function");
    });
    it("should return a promise", () => {
      const { connect } = getModule();
      const { url, name } = mongodbConfig; // eslint-disable-line

      expect(
        connect(
          url,
          name
        )
      ).to.be.instanceOf(Promise);
    });

    it("should resolve with connection instance", done => {
      const { connect } = getModule();
      const { url, name } = mongodbConfig; // eslint-disable-line

      connect(
        url,
        name
      )
        .then(connection => {
          expect(connection).to.be.a("object");
          done();
        })
        .catch(done);
    });
  });

  describe("isConnected", () => {
    it("should be a function", () => {
      const { isConnected } = getModule();

      expect(isConnected).to.be.a("function");
    });
    it("should return a boolean", () => {
      const { isConnected } = getModule();

      expect(isConnected()).to.be.a("boolean");
    });
  });

  describe("collection", () => {
    it("should be a function", () => {
      const { collection } = getModule();

      expect(collection).to.be.a("function");
    });

    it("should return a query", done => {
      const { collection, connect } = getModule();
      const { url, name } = mongodbConfig; // eslint-disable-line

      connect(
        url,
        name
      )
        .then(connection => {
          expect(connection).to.not.be.undefined;
          expect(collection).to.be.a("function");
          expect(collection("test")).to.be.a("object");
          done();
        })
        .catch(done);
    });
  });

  describe("model", () => {
    it("should be a function", () => {
      const { model } = getModule();

      expect(model).to.be.a("function");
    });
  });
});
