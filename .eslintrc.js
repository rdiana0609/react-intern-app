module.exports = {
  env: {
    browser: false,
    es2021: false,
    node: true,
  },
  extends: [
    'plugin:promise/recommended',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'airbnb',
    'airbnb-typescript',
    'plugin:unicorn/recommended',
  ],
  ignorePatterns: [
    '*eslintrc.js',
    '*setupTests.ts',
    '*reportWebVitals.ts',
    '*react-app-env.d.ts'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'typescript-sort-keys',
    'sort-destructure-keys',
  ],
  rules: {
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-invalid-void-type': 'off',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        distinctGroup: false,
        groups: [
          'external',
          'builtin',
          'internal',
          'parent',
          ['sibling', 'index'],
        ],
        'newlines-between': 'always-and-inside-groups',
        pathGroups: [
          { pattern: 'react', group: 'external', position: 'before' },
          { pattern: 'constants', group: 'internal', position: 'after' },
          { pattern: 'components', group: 'internal', position: 'after' },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
    'import/prefer-default-export': 'off',
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['state'] },
    ],
    'no-shadow': 'off',
    'no-undef': 'off',
    'no-void': ['error', { allowAsStatement: true }],
    'promise/prefer-await-to-then': 'error',
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
    'react/jsx-fragments': 'error',
    "object-curly-newline": [
      "warn",
      {
        "ObjectExpression": { "consistent": true, "multiline": true },
        "ObjectPattern": { "consistent": true, "multiline": true },
        "ImportDeclaration": "never",
        "ExportDeclaration": { "multiline": true, "minProperties": 3 }
      }
    ],
    'react/jsx-handler-names': [
      'error',
      {
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
        checkLocalVariables: true,
        checkInlineFunction: false,
      },
    ],
    'react/jsx-max-depth': ['error', { max: 6 }],
    'react/jsx-newline': ['error', { prevent: true }],
    'react/jsx-no-leaked-render': 'error',
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        ignoreCase: true,
        multiline: 'last',
        noSortAlphabetically: false,
        reservedFirst: true,
      },
    ],
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': 'off',
    'sort-destructure-keys/sort-destructure-keys': [
      'error',
      { caseSensitive: true },
    ],
    'sort-keys': ['error', 'asc', { caseSensitive: true, natural: true }],
    'sort-imports': [
      'error',
      { ignoreCase: true, ignoreDeclarationSort: true },
    ],
    'sort-vars': ['error', { ignoreCase: true }],
    'typescript-sort-keys/string-enum': [
      'error',
      'asc',
      { caseSensitive: false, natural: true },
    ],
    'typescript-sort-keys/interface': [
      'error',
      'asc',
      { caseSensitive: false, natural: true },
    ],
    'unicorn/consistent-function-scoping': [
      'error',
      { checkArrowFunctions: false },
    ],
    'unicorn/no-array-for-each': 'off',
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
        ignore: ['w*.tsx$', 'w*.jsx$'],
      },
    ],
    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          e: {
            event: false,
          },
          args: false,
          dev: false,
          param: false,
          params: false,
          prod: false,
          prop: false,
          props: false,
          ref: false,
          cmd: {
            command: true,
          },
          errCb: {
            handleError: true,
          },
        },
      },
    ],
    'unicorn/no-null': 'off',
    'unicorn/prefer-node-protocol': 'off',
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      node: true,
      typescript: true,
    },
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
      rules: {
        'testing-library/prefer-user-event': 'off',
        'testing-library/prefer-wait-for': 'off',
        'testing-library/no-wait-for-empty-callback': 'off',
      },
    },
  ],
};
