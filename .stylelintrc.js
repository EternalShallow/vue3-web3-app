/*
  npm install --save-dev
    stylelint
    stylelint-config-standard-scss
    stylelint-config-css-modules
    stylelint-order
    stylelint-config-rational-order
    stylelint-config-prettier
    stylelint-declaration-block-no-ignored-properties
*/
module.exports = {
  extends: ["stylelint-config-standard-scss", "stylelint-config-css-modules", "stylelint-config-rational-order", "stylelint-config-prettier"],
  plugins: ["stylelint-declaration-block-no-ignored-properties"],
  rules: {
    "plugin/declaration-block-no-ignored-properties": true,
    "at-rule-no-unknown": null,
    "selector-class-pattern": [
      /(^([a-z][a-z0-9]*)(-[a-z0-9]+)*$)|(^van-.+$)/,
      {
        message: "Expected class selector to be kebab-case",
      },
    ],
  },
};
