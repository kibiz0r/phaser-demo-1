/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  // preset: 'ts-jest',
  // testEnvironment: '<rootDir>/phaser-env3.ts',
  // testEnvironment: 'jsdom',
  rootDir: "spec",
  testMatch: ["**/*.spec.ts"],
  // testEnvironmentOptions: { html: "<!DOCTYPE html><body></body>" },
  // transform: {
  //   '^.+\\.(t|j)sx?$': ['esbuild-jest', {
  //     sourcemap: true,
  //   }],
  //   // '^.+\\.(t|j)sx?$': '@swc/jest',
  // },
  // transform: {
  //   "^.+\\.tsx?$": [
  //     "esbuild-jest",
  //     {
  //       sourcemap: true,
  //     }
  //   ]
  // }
};
