module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'plugin:jest/recommended',
        'plugin:storybook/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: '@typescript-eslint/parser',
    },
    settings: {
        react: { version: 'detect' },
        'import/resolver': {
            typescript: {},
        },
    },
    plugins: ['react-refresh', 'prettier', '@typescript-eslint', 'jest'],
    rules: {
        'no-unused-vars': ['warn'],
        'react/jsx-no-target-blank': 'off',
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'prettier/prettier': 'error',
    },
    ignorePatterns: ['dist', '.eslintrc.cjs'],
};
