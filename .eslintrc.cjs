module.exports = {
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
    defineOptions: 'readonly'
  },
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    // 'standard-with-typescript'
    'plugin:vue/vue3-strongly-recommended'
    // 'plugin:vue/vue3-essential',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
    // project: ['./tsconfig.eslint.json']
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    indent: ['off', 2],
    'no-var': 'error',
    'vue/multi-word-component-names': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
