const { expect } = require("chai");
const getModule = () => require("./../../index");

describe("@/index.js [MongoZilla]", () => {
  it("should have immutable prop name as string", () => {
    const MongoZilla = getModule();
    const name = "Test Name";

    expect(MongoZilla.name).to.be.a("string");
    MongoZilla.name = name;
    expect(MongoZilla.name).to.not.eq(name);
  });

  it("should have method connect", () => {
    const { connect } = getModule();
    const mongoose = require("mongoose");

    const AA = mongoose.model(
      "AA",
      new mongoose.Schema({ name: String }),
      "test"
    );

    expect(connect).to.be.a("function");
  });

  it("should have method isConnected", () => {
    const { isConnected } = getModule();

    expect(isConnected).to.be.a("function");
  });

  it("should have method collection", () => {
    const { collection } = getModule();

    expect(collection).to.be.a("function");
  });
});
