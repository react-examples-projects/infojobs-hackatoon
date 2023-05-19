module.exports = {
  env: { browser: true, es2020: true },
  extends: [
   // "./node_modules/standard/eslintrc.json",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["@tanstack/query", "react-refresh"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "@tanstack/query/exhaustive-deps": "error",
    quotes: ["warn", "double"],
    "no-unused-vars": "warn",
    "no-undef": "error",
    "no-use-before-define": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
};
