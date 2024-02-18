/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */


const nextJest = require('next/jest.js')

const createJestConfig = nextJest({
  dir: './',
})

// const config = {
 
//   clearMocks: true,

//   collectCoverage: true,

//   coverageDirectory: "coverage",

//   coverageProvider: "v8",

//   moduleNameMapper: {
//     '^@/components/(.*)$': '<rootDir>/components/$1',
//   },

//   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], 

//   preset: 'ts-jest',

//   transform: {
//     "^.+\\.tsx?$": "ts-jest"
//   },

//   testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
//   moduleFileExtensions: [
//     "ts",
//     "tsx",
//     "js",
//     "jsx",
//     "json",
//     "node"
//   ],

//   collectCoverageFrom: ['components/**/*.ts', 'pages/**/*.ts'],

//   modulePaths: [
//     "<rootDir>"
//   ],

//   verbose: true,

// };


// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
};


module.exports = createJestConfig(customJestConfig)
