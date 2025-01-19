import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu(
  {
    ignores: [],
  },
  ...compat.config({
    parserOptions: {
      parser: '@typescript-eslint/parser',
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    rules: {
      'vue/multi-word-component-names': 0,
      'no-undef': 'off',
      'vue/valid-v-slot': ['error', {
        allowModifiers: true,
      }],
    },
  }),
)
