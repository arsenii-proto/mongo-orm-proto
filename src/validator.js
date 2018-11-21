const R = require("ramda");

const isType = R.curry(type => R.flip(R.propIs(type)));
const withRequire = R.curry(check => R.both(check, R.flip(R.has)));
const withDefault = R.curry((check, value, obj, prop) => {
  if (!R.has(prop)(obj) || R.isEmpty(obj[prop]) || R.isNil(obj[prop])) {
    obj[prop] = value;
  }
  return check(obj, prop);
});
const withMin = R.curry((check, value) =>
  R.both(
    check,
    R.compose(
      _ => R.gte(_, value),
      R.flip(R.prop)
    )
  )
);
const withMax = R.curry((check, value) =>
  R.both(
    check,
    R.compose(
      _ => R.gte(value, _),
      R.flip(R.prop)
    )
  )
);

const addRequired = check => (check.required = withRequire(check)) && check;
const addDefaut = check => (check.default = withDefault(check)) && check;
const addMin = check => (check.min = addMax(withMin(check))) && check;
const addMax = check => (check.min = addMin(withMax(check))) && check;

const facade = R.map(
  check =>
    R.compose(
      addDefaut,
      addRequired
    )(check),
  {
    String: isType(String),
    Number: isType(Number),
    Boolean: isType(Boolean),
    Bool: isType(Boolean),
    Array: isType(Array),
    Object: isType(Object),
    Date: isType(Date),
    Any: isType(_ => true),
    Mixed: isType(_ => true)
  }
);

addMax(addMin(facade.Number));

module.exports = Object.freeze(facade);
