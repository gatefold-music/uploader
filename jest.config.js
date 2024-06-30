module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testEnvironment: "node",
  testRegex: "./test/.*\\.(test|spec)?\\.(js|ts)$",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  roots: ["<rootDir>/test"],
};
