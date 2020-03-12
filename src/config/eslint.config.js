const rules = [
  'semi',
  'yoda',
  'eqeqeq',
  'no-var',
  'no-console',
  'no-unused-vars',
  'no-cond-assign',
  'array-callback-return',
  'default-case',
  'no-else-return',
  'no-empty-function',
  'no-invalid-this',
  'no-return-assign',
  'no-return-await',
  'no-unmodified-loop-condition',
  'no-unused-expressions',
  'no-useless-concat',
  'no-useless-return',
  'no-magic-numbers',
  'no-unused-expressions'
].reduce((obj, rule) => {
  obj[rule] = 1;
  return obj;
}, {});

module.exports = {
  rules: rules,
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 11
  },
  env: {
    es2020: true,
    browser: true
  }
};
