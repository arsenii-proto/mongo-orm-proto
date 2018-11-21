const R = require("ramda");

const canVilidate = validator =>
  (validator.isValid = value =>
    R.all(
      R.equals(true),
      R.juxt(R.values(validator.checks))(R.compose(...validator.pipes)(value))
    ));

const validateMaxLength = validator =>
  (validator.maxLength = l => {
    validator.checks.maxLength = v => R.gte(l, R.length(v));
    return validator;
  });
const validateMinLength = validator =>
  (validator.minLength = l => {
    validator.checks.minLength = v => R.gte(R.length(v), l);
    return validator;
  });
const validateInList = validator =>
  (validator.in = l => {
    validator.checks.in = v => R.includes(v, l);
    return validator;
  });

const validateMatch = validator =>
  (validator.match = r => {
    validator.checks.match = R.match(r);
    return validator;
  });

const pipeTrim = validator =>
  (validator.trim = _ => {
    validator.pipes.push(R.trim);
    return validator;
  });
const pipeLowerCase = validator =>
  (validator.lowercase = _ => {
    validator.pipes.push(R.toLower);
    return validator;
  });
const pipeUpperCase = validator =>
  (validator.uppercase = _ => {
    validator.pipes.push(R.toUpper);
    return validator;
  });

const makeValidator = () =>
  R.last(
    R.juxt([
      canVilidate,
      validateMaxLength,
      validateMinLength,
      validateInList,
      validateMatch,
      pipeTrim,
      pipeLowerCase,
      pipeUpperCase,
      v => v
    ])({
      checks: {
        type: R.is(String)
      },
      pipes: [String]
    })
  );

module.exports = () => makeValidator();
