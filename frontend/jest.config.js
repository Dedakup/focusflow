/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
    coverageReporters: ['text', 'lcov'],
};
