module.exports = {
  // "collectCoverage": true,
  // "coverageDirectory": "coverage",
  "verbose": false,
  // "roots": [
  //   "TEST"
  // ],
  "transform": {
    "\\.[jt]sx?$": "babel-jest"
  },
  "transformIgnorePatterns":  ["/node_modules/(?!(foo|bar)/)", "/bar/"],
  // "coverageThreshold": {
  //   "global": {
  //     "branches": 78,
  //     "functions": 90,
  //     "lines": 90,
  //     "statements": 90
  //   }
  // },
  // "setupFiles": [
  //   "./setupTests.js"
  // ]
}