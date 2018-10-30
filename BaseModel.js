const R = require("ramda");

const Base = options => {
  return new Proxy(() => {}, {
    ...proxyMaker(
      R.pick(["collection", "schema", "hooks", "views", "procedures"], options)
    ),
    construct(self, args) {
      const newest = new self(...args);
      // TODO: Make date validation for newest instance, and all stuff

      return new Proxy(
        newest,
        proxyMaker(R.pick(["methods", "computed"], options))
      );
    }
  });
};

const proxyMaker = proxy => {
  const reflection = {
    methods: [],
    props: [],
    custom: {},
    evolving: true
  };

  const proxy = {
    set(_, prop, value) {
      if (reflection.evolving) {
        if (prop in reflection.custom && reflection.custom[prop].writable) {
          reflection.custom[prop].value = value;
          return value;
        } else {
          reflection.custom[prop] = {
            writable: true,
            enumerable: true,
            configurable: true,
            value
          };
        }
      }
      return undefined;
    },
    defineProperty(_, prop, descriptor) {
      if (reflection.evolving) {
        reflection.custom[prop] = {
          writable: true,
          enumerable: true,
          configurable: true,
          ...descriptor
        };
      }
      return reflection.evolving;
    },
    deleteProperty(_, prop) {
      if (prop in reflection.custom) {
        delete reflection.custom[key];
      }
    },
    get(self, prop) {
      if (prop in reflection.methods) {
        return reflection.methods[prop].bind(self);
      } else if (prop in reflection.props) {
        return reflection.props[prop];
      } else if (prop in reflection.custom[prop]) {
        return reflection.custom[prop].value;
      } else {
        // TODO: Make warning of unexists prop getter
        return undefined;
      }
    },
    getOwnPropertyDescriptor(_, prop) {
      if (prop in reflection.methods) {
        return {
          configurable: false,
          enumerable: false,
          writable: false,
          value: reflection.methods[prop].bind(self)
        };
      } else if (prop in reflection.props) {
        return {
          configurable: true,
          enumerable: true,
          writable: true,
          value: reflection.props[prop]
        };
      } else if (prop in reflection.custom[prop]) {
        return reflection.custom[prop];
      } else {
        // TODO: Make warning of unexists prop getter
        return undefined;
      }
    },
    getPrototypeOf() {
      return {};
    },
    has(_, prop) {
      if (
        prop in reflection.methods ||
        prop in reflection.props ||
        prop in reflection.custom[prop]
      ) {
        return true;
      }
      return false;
    },
    isExtensible() {
      return reflection.evolving;
    },
    preventExtensions() {
      return !(reflection.evolving = false);
    },
    ownKey() {
      return [].concat(
        Object.keys(reflection.custom),
        Object.keys(reflection.props),
        Object.keys(reflection.methods)
      );
    },
    setPrototypeOf() {
      return false;
    }
  };
};

module.exports = {
  BaseModel: Base
};
