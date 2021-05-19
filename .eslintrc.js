module.exports = {
  env: {
    es2021: true,
    node: true,
    browser: true
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'react',
    'react-hooks'
  ],
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error'
  }
}
