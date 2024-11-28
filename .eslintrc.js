module.exports = {
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['~components', './src/components'],
          ['~shared-components', './src/shared-components'],
          ['~pages', './src/pages'],
          ['~hooks', './src/hooks'],
          ['~api', './src/api'],
          ['~context', './src/context'],
        ],
        extensions: ['.js', '.jsx', '.json'],
      },
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['prettier', 'react', 'jsx-a11y', 'unused-imports'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.js'] }],
    'react/react-in-jsx-scope': 'off',
    'quotes': ['error', 'single', { avoidEscape: true }],
    'comma-dangle': ['error', 'always-multiline'],
    'prettier/prettier': 'error',
    'linebreak-style': ['error', 'unix'],
    'import/no-extraneous-dependencies': [
      {
        files: ['webpack*.js'],
        rules: {
          'import/no-extraneous-dependencies': 'off',
        },
      },
    ],
    'camelcase': ['error', { properties: 'always' }],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-plusplus': 'error',
    'no-console': 'error',
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],
    'unused-imports/no-unused-imports': 'error',
    'no-duplicate-imports': 'error',
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        pathGroups: [
          {
            pattern: '@mui/**',
            group: 'external',
            position: 'after',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
