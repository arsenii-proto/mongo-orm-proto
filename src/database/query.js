/** @type {MongoZilla.Query.FromColectionContructor} */
function fromCollection(collection) {
  /** @type {MongoZilla.Query.Instance} */
  const query = {
    collection
  };

  return query;
}

/** @type {MongoZilla.Query.FromModelContructor} */
function fromModel(model) {
  /** @type {MongoZilla.Query.Instance} */
  const query = {
    model
  };

  return query;
}

/** @type {MongoZilla.Query.Facade} */
const facade = {
  fromCollection,
  fromModel
};

module.exports = Object.freeze(facade);
