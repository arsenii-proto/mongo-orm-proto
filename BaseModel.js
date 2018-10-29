const ClassProxy = require("./ClassProxy");

/**
 * Create constructor for new Model .
 *
 * @since 1.0.0
 *
 * @param {object} options - The Options of model.
 * @param {string} options.collection - The Collection name wher the model are stoked.
 * @param {object} options.schema - The Schema of model.
 * @param {object} [options.methods={}] - The Methods of model.
 * @param {object} [options.computed={}] - The computed attributes of model (use memoise).
 * @param {object} [options.hooks={}] - The database hooks of model.
 * @param {object} [options.views={}] - The database named views of model.
 * @param {object} [options.procedures={}] - The database executable procedures of model.
 * @return {Function}
 *
 */

const Base = options => new Proxy(() => {}, ClassProxy(proxy));

module.exports = {
  BaseModel: Base
};
