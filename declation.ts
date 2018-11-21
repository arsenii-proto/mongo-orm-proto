declare module MongoZilla {
  type Facade = {
    /** Name of Module */
    name: string;
    /** Connect to the database (Use as default database connection) */
    connect: Connection.ConnectInterface;
    /** Return boolean representation of connection state for default database connection */
    isConnected: () => boolean;
    /** Return query for collection by provided collection name from default database connection */
    collection: (collectionName: string) => Query.Instance;
    /** Create new Model Factory by provided schema from default database connection */
    model: ModelFactory.Constructor;
  };
}

declare module MongoZilla.Connection {
  type Facade = {
    /** Connect to the database (Use as default database connection) */
    connect: ConnectInterface;
    /** Return boolean representation of connection state for default database connection */
    isConnected: () => boolean;
    /** Return query for collection by provided collection name from default database connection */
    collection: (collectionName: string) => Query.Instance;
    /** Create new Model Factory by provided schema from default database connection */
    model: ModelFactory.Constructor;
  };

  type ConnectInterface = {
    (
      /**
       * Url in string representation
       *
       * **ex. _mongodb://localhost:27017/myproject_**
       */
      url: string,
      /** Database name */
      name: string,
      /**
       * Connect options object
       *
       * **link** http://mongodb.github.io/node-mongodb-native/3.1/api/MongoClient.html
       */
      options?: ConnectOptions
    ): Promise<Instance>;
  };

  type ConnectOptions = {};

  type Instance = {
    /** Return boolean representation of connection state for current database connection */
    isConnected: () => boolean;
    /** Return query for collection by provided collection name from current database connection */
    collection: (collectionName: string) => Query.Instance;
    /** Create new Model Factory by provided schema from current database connection */
    model: ModelFactory.Constructor;
  };
}

declare module MongoZilla.Query {
  type FromColectionContructor = {
    (collection: Object): Instance;
  };

  type FromModelContructor = {
    (model: ModelFactory.Factory): Instance;
  };

  type Instance = {};
  type Facade = {
    fromCollection: FromColectionContructor;
    fromModel: FromModelContructor;
  };
}

declare module MongoZilla.ModelFactory {
  type Constructor = {
    (schema: Schema): Factory;
  };

  type Schema = {};

  type Factory = {};
}
