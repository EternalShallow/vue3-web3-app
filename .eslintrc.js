module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
    commonjs: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'no-param-reassign': 'off',
    'global-require': 'off',
    'no-use-before-define': 'off',
    'no-underscore-dangle': 'off',
    'max-len': ['error', 300],
    'no-mixed-operators': 'off',
    'no-console': 'off',
  },
};
