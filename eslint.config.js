const globals = require("globals");

module.exports = [
  {
    files: ["eslint.config.js"],
    languageOptions: {
      globals: globals.node
    }
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        ...globals.browser,
        $: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-console": "off"
    }
  }
];