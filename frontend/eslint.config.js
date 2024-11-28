import eslint from '@eslint/js';
import parser from '@typescript-eslint/parser';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';
import jestPlugin from 'eslint-plugin-jest';
import storybookPlugin from 'eslint-plugin-storybook';

export default [
    eslint.configs.recommended,
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: parser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                window: 'readonly',
                document: 'readonly',
                localStorage: true,
                console: 'readonly',
                fetch: true,
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                requestAnimationFrame: true,
                cancelAnimationFrame: true,
                navigator: 'readonly',
                performance: true,
                crypto: true,
                Notification: true,
                CustomEvent: true,
                HTMLElement: true,
                Element: true,
                Node: true,
                SVGElement: true,
                IntersectionObserver: true,
                ResizeObserver: true,
                MutationObserver: true,
                CSS: true,
                process: 'readonly',
                __dirname: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tseslintPlugin,
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            'react-refresh': reactRefreshPlugin,
            prettier: prettierPlugin,
            jest: jestPlugin,
            storybook: storybookPlugin,
        },
        settings: {
            react: { version: 'detect' },
            'import/resolver': {
                typescript: {},
            },
        },
        rules: {
            'no-unused-vars': ['warn'],
            'react/jsx-no-target-blank': 'off',
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'prettier/prettier': 'error',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off',
        },
    },
];
