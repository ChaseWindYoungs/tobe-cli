module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
    // '@vue/eslint-config-typescript',
    // '@vue/eslint-config-prettier/skip-formatting'
    // 'plugin:vue/vue3-essential',
    // 'plugin:vue/vue3-recommended',
    // 'standard'
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/no-mutating-props': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: {
          max: 3
        },
        multiline: {
          max: 1
        }
      }
    ],
    'vue/first-attribute-linebreak': [
      'error',
      {
        singleline: 'ignore',
        multiline: 'below'
      }
    ],
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    indent: ['warn', 2, { SwitchCase: 1, flatTernaryExpressions: false, CallExpression: true }],
    'no-trailing-spaces': 'error',
    'no-unused-vars': ['off', 'always'],
    'no-undef': ['off', 'always'],
    camelcase: ['off', 'always']
  }
};
