const { expect } = require("chai");

describe("@/index.js [MongoZilla]", () => {
  describe("Exports", () => {
    it("sould export non empty object", () => {
      const mongozilla = require("./../../index");

      expect(mongozilla).to.not.be.empty;
    });
    describe("name", () => {
      const mongozilla = require("./../../index");

      it("should be an string", () => {
        expect(mongozilla.name).to.be.a("String");
      });
      it("should equal [mongozilla]", () => {
        expect(mongozilla.name).to.be.eq("mongozilla");
      });
    });
    describe("connectd", () => {
      const mongozilla = require("./../../index");

      it("should be a function", () => {
        expect(mongozilla.connected).to.be.a("function");
      });

      it("should return boolean type", () => {
        expect(mongozilla.connected()).to.be.a("boolean");
      });
    });
    describe("model", () => {
      const mongozilla = require("./../../index");
      const schema = {};

      it("should be a function", () => {
        expect(mongozilla.model).to.be.a("function");
      });
      it.skip("should return a function when have some active connections", () => {
        expect(mongozilla.model(schema)).to.be.a("function");
      });
      it("should throw error when do not have some active connections", done => {
        try {
          mongozilla.model(schema);
          done(new Error());
        } catch (err) {
          done();
        }
      });
    });
    describe("nested", () => {
      const mongozilla = require("./../../index");
      const schema = {};

      it("should be an HOF", () => {
        expect(mongozilla.nested).to.be.a("function");
        expect(mongozilla.nested(schema)).to.be.a("function");
      });
    });
  });
});
