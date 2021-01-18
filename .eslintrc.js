module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "indent": "off",
    "no-console": "off",
    "func-names": "off",
    "linebreak-style": "off",
    "camelcase": "off",
    "import/extensions": "off",
    "react/jsx-indent": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-indent-props": "off",
    "react/jsx-tag-spacing": "off",
    "react/jsx-no-bind": "off",
    "react/sort-comp": "off",
    "react/jsx-boolean-value": "off",
    "react/jsx-props-no-spreading": "off",
    "react/prefer-stateless-function": "off",
    "react/no-access-state-in-setstate": "off",
    "react/destructuring-assignment": "off", // 解构
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "comma-dangle": "off",
    "no-tabs": "off",
    "max-len": "off",
    "no-plusplus": "off",
    "prefer-destructuring": "off", // 解构
    "no-param-reassign": "off",
    "react/prop-types": "off",
    "class-methods-use-this": "off",
    "space-before-function-paren": "off",
  },
};
