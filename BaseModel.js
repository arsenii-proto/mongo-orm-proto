const ClassProxy = require("./ClassProxy");

const Base = proxy => new Proxy(() => {}, ClassProxy(proxy));

module.exports = {
  Base
};
