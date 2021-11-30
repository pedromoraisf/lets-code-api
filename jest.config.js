/* eslint-disable quotes */
module.exports = {
  roots: ['./src'],
  collectCoverageFrom: ['./src/**/*.ts', '!<rootDir>/src/main/**'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
