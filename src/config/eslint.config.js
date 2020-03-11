const rules = [
  'semi',
  'no-var',
  'no-console',
  'no-unused-vars',
  'no-cond-assign',
  'array-callback-return',
  'default-case',
  'eqeqeq',
  'no-else-return',
  'no-empty-function',
  'no-invalid-this',
  'no-return-assign',
  'no-return-await',
  'no-unmodified-loop-condition',
  'no-unused-expressions',
  'no-useless-concat',
  'no-useless-return',
  'yoda',
  'noInlineConfig',
  'no-magic-numbers',
  'no-unused-expressions'
];

module.exports = {
  env: {
    es2020: true,
    browser: true
  },
  extends: 'eslint:recommended',
  rules: rules.reduce((all, rule) => {
    all[rule] = 1;
    return all;
  }, {}),
  parserOptions: {ecmaVersion: 11}
};
