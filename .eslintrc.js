module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: ['alloy', 'alloy/react', 'alloy/typescript', 'plugin:react-hooks/recommended'],
  env: {
    // Your environments (which contains several predefined global variables)
    //
    // browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // Your global variables (setting to false means it's not allowed to be reassigned)
    chrome: 'readonly',
    JSX: 'readonly',
  },
  rules: {
    // Customize your rules
    'max-params': 0,
  },
};
