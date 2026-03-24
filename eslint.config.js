import eslint from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import queryPlugin from '@tanstack/eslint-plugin-query';
import tailwind from 'eslint-plugin-tailwindcss';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  {
    ignores: ['dist', 'node_modules', '.vstst']
  },

  eslint.configs.recommended,
  tseslint.configs.recommended,
  ...tailwind.configs['flat/recommended'],

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react': react,
      'jsx-a11y': jsxA11y,
      'import': importPlugin,
      '@tanstack/query': queryPlugin,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // --- React & Hooks ---
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/jsx-no-target-blank': 'error',
      'react/self-closing-comp': 'warn',

      // --- TypeScript ---
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn', // 완전히 끄기보다 warn으로 두어 점진적 개선 유도
      '@typescript-eslint/consistent-type-imports': 'error',

      // --- TanStack Query (v5) ---
      '@tanstack/query/exhaustive-deps': 'error',
      '@tanstack/query/no-rest-destructuring': 'warn',
      '@tanstack/query/stable-query-client': 'error',

      // --- Tailwind CSS ---
      'tailwindcss/no-custom-classname': 'off', // 커스텀 클래스 허용 (생산성)
      'tailwindcss/classnames-order': 'warn',

      // --- Import Ordering (가독성의 핵심) ---
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal', // @/ 경로가 이 그룹에 속하게 됩니다
            ['parent', 'sibling'],
            'index',
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**', // @/로 시작하는 모든 경로를 internal로 간주
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // --- Accessibility (최소한의 접근성) ---
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/aria-props': 'warn',
    },
  },
  // 마지막에 배치하여 다른 규칙들의 스타일 관련 설정을 덮어씌움 (충돌 방지)
  eslintConfigPrettier,
);