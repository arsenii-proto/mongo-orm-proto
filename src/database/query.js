/** @type {MongoZilla.Query.Contructor} */
function createNew(collection) {
  /** @type {MongoZilla.Query.Instance} */
  const query = {
    collection
  };

  return query;
}

module.exports = createNew;
