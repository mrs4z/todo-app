require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-airbnb-with-typescript',
    '@vue/eslint-config-airbnb-with-typescript/allow-tsx-in-vue',
    'prettier',
  ],
  parser: 'vue-eslint-parser',
  plugins: ['prettier', 'pug'],
  root: true,
  rules: {
    'prettier/prettier': 'error',
    'object-curly-spacing': ['error', 'always'],
    'space-in-parens': 2,
    'space-before-function-paren': 0,
    'vue/script-setup-uses-vars': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    'no-restricted-syntax': 'off',
    'no-param-reassign': 'off',
  },
};
