module.exports = {
  // testEnvironment: "enzyme",
  // collectCoverage: true,
  // collectCoverageFrom: ["src/**/*.{js,jsx}"],
  verbose: true,
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/mocks/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/fileMock.js"
  }
};
