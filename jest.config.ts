/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  coverageProvider: "v8",
  preset: 'ts-jest',  
  testEnvironment: 'node',
  moduleNameMapper: {
    "^@adapters/(.*)$": "<rootDir>/src/adapters/$1",
    "^@application/(.*)$": "<rootDir>/src/application/$1",
    "^@domain/(.*)$": "<rootDir>/src/domain/$1",
    "^@infra/(.*)$": "<rootDir>/src/infra/$1",
    "^@routes/(.*)$": "<rootDir>/src/routes/$1",
    "^@server/(.*)$": "<rootDir>/src/server/$1",
    "^@tests/(.*)$": "<rootDir>/src/tests/$1"
  },
  extensionsToTreatAsEsm: ['.ts'], 
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }], 
  },
};

export default config;

