module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'jsx-a11y', 'prettier', 'import'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        duubleQuote: false,
        semi: true,
        printWidth: 100,
        tabWidth: 2,
        trailingComma: 'es5',
        bracketSpacing: true,
        arrowParens: 'always',
        endOfLine: 'auto',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
    'no-console': 'warn',
    'no-unused-vars': [
      'warn',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],
    'no-multiple-empty-lines': ['warn', { max: 2 }],
    'import/no-extraneous-dependencies': 'off',
    'import/order': [
      'warn',
      {
        groups: [
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        'newlines-between': 'ignore',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
