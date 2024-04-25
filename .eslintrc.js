module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // 解决 'module' is not defined报错。
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended", //新增
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "@typescript-eslint/no-explicit-any": ["off"],
    "prefer-const": "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
};
