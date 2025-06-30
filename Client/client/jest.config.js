const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
   setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: "jsdom",
  transform: {
    ...tsJestTransformCfg,
  },
};