let a = {
  methods: {
    sayHello(name) {
      return `Hello ${name}`;
    }
  },
  computed: {
    fullName() {
      return `${this._data_.firstName || "Unnamed"} ${this.lastName ||
        "Unnamed"}`;
    },
    age() {
      return this._data_.age || 1;
    }
  },
  onCreating() {
    this.age = 0;
  },
  actions: {
    async mama(...args) {
      return ["MIA", ...args];
    },
    deva(...args) {
      return Promise.resolve(["MARIA", ...args]);
    },
    nope() {
      return "aaaaa";
    }
  }
};

let b = {
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    weight() {
      return this.weight || 1;
    }
  },
  onCreating() {
    this.weight = 0;
  }
};

function mix(main, ...mixins) {
  let hooks = {};
  [main, ...mixins].forEach(mixin => {
    parseMixinActions(mixin, hooks);
    parseMixinComputed(mixin, hooks);
    parseMixinMethods(mixin, hooks);
  });

  return hooks;
}

function parseMixinActions(mixin, hooks) {
  mixin = mixin || {};
  hooks.getters = hooks.getters || {};
  Object.keys(mixin.actions || {}).forEach(key => {
    if (key in hooks.getters) return;
    if (typeof mixin.actions[key] !== "function") return;

    const action = mixin.actions[key];

    hooks.getters[key] = target => (...args) => {
      const started = new Date();
      return Promise.resolve()
        .then(() => action.apply(target, args))
        .catch(err => {
          console.error("Bleadi", [err]);
        })
        .then(result => ({
          result,
          dates: {
            started,
            ended: new Date()
          }
        }));
    };
  });
}

function parseMixinMethods(mixin, hooks) {
  mixin = mixin || {};
  hooks.getters = hooks.getters || {};
  Object.keys(mixin.methods || {}).forEach(key => {
    if (key in hooks.getters) return;
    if (typeof mixin.methods[key] !== "function") return;

    const method = mixin.methods[key];

    hooks.getters[key] = target => method.bind(target);
  });
}

function parseMixinComputed(mixin, hooks) {
  mixin = mixin || {};
  hooks.getters = hooks.getters || {};
  hooks.setters = hooks.setters || {};
  Object.keys(mixin.computed || {}).forEach(key => {
    if (key in hooks.getters) return;
    if (!["function", "object"].includes(typeof mixin.computed[key])) return;

    const computed = mixin.computed[key];
    if (typeof mixin.computed[key] === "function") {
      hooks.getters[key] = target => computed.call(target);
    } else {
      if ("get" in computed) {
        if (typeof computed.get === "function") {
          hooks.getters[key] = target => computed.get.call(target);
        } else {
          hooks.getters[key] = () => computed.get;
        }
      }

      if ("set" in computed) {
        if (typeof computed.set === "function") {
          hooks.setters[key] = (target, value) =>
            computed.set.call(target, value);
        }
      }
    }
  });
}

function getMeTheInstance(data, mixHooks) {
  const proxy = new Proxy(data, {
    get(_, prop) {
      if (prop === "_data_") {
        return data;
      }

      if (prop in (mixHooks.getters || {})) {
        return mixHooks.getters[prop](proxy);
      }

      return undefined;
    }
  });

  return proxy;
}
