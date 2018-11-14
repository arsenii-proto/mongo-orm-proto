declare module MongoZilla {
  type Facade = {
    name: string;
    create: MongoZilla.Connection.ConnectionCreator;
    model: ModelFactory.FactoryCreator;
  };
}

declare module MongoZilla.Connection {
  type ModelCreator = (schema: Schema) => ModelFactory.Facade;

  type ConnectionCreator = (url: string, options: object) => Instance;

  type Instance = {
    collection: string;
    methods?: object;
  };

  interface Schema {
    collection: string;
    methods?: object;
  }
}

declare module MongoZilla.ModelFactory {
  type Facade = {};
  type FactoryCreator = (schema: Connection.Schema) => Facade;
}
