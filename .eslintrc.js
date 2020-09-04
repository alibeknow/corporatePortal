module.exports = {
  extends: ['airbnb-base', 'prettier'],
  parser: 'babel-eslint',
  rules: {
    'newline-per-chained-call': 'off',
    quotes: ['error', 'single'],
    'no-await-in-loop': 'off',
    semi: ['error', 'always'],
    radix: ['error', 'as-needed'],
    'max-len': ['error', {
      code: 115,
      ignoreComments: true,
      ignoreUrls: true,
    }],
    camelcase: 'off',
    'no-plusplus': 'off',
    'no-else-return': 'off',
    'no-underscore-dangle': 'off',
    'import/order': ['error', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always',
    }],
    'no-restricted-syntax': 'off',
    'no-continue': 'off',
    'no-unused-vars': ['error', { 'varsIgnorePattern': 'envVars'}]
  },

  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
};
