import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettierConfig, // 🔹 desactiva reglas conflictivas con Prettier
    ],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
      parser: tseslint.parser,
    },
     plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: prettierPlugin,
      import: importPlugin,
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
         typescript: {
          project: './tsconfig.json',
        },
      },
    },
     rules: {
      // ✨ Reglas básicas
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'react-hooks/exhaustive-deps': 'warn',
      // 💅 Prettier: mostrar error si el formato no coincide
      'prettier/prettier': 'error',

      // 📦 Orden de imports
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // node built-ins (fs, path, etc.)
            'external', // npm packages (react, axios, etc.)
            'internal', // alias (@/utils, etc.)
            ['parent', 'sibling'], // ../ y ./
            'index', // index.ts
            'object', // importaciones de objetos (poco comunes)
            'type', // importaciones solo de tipos (TS)
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always', // 👈 inserta líneas en blanco entre grupos
          alphabetize: {
            order: 'asc', // orden alfabético ascendente
            caseInsensitive: true,
          },
        },
      ],
    },
  },
])
