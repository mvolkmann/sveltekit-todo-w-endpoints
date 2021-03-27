module.exports = {
  // See https://github.com/sveltejs/language-tools/issues/918.
  env: {
    es6: true, // for Promise
    node: true // for console
  },
  root: true,
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['svelte3'],
  overrides: [{files: ['*.svelte'], processor: 'svelte3/svelte3'}],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018
  }
};
