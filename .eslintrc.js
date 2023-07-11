module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  plugins: ['regexp', 'node', '@typescript-eslint/eslint-plugin'],
  extends: ['plugin:regexp/recommended', 'plugin:node/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  rules: {
    'node/shebang': 0,
    semi: 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-var-requires': 'off',
    'no-unused-expressions': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-missing-import': [
      'error',
      {
        tryExtensions: ['.js', '.ts'],
      },
    ],
  },
}
