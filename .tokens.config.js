const sassFileOutput = require("./src/tokens/config/sass");

module.exports = {
  "source": [
    "src/tokens/**/*.json"
  ],
  "platforms": {
    "src/sass/core": {
      transformGroup: 'scss',
      buildPath: 'src/sass/core/',
      files: sassFileOutput
    },
    "tokens/sass": {
      transformGroup: 'scss',
      buildPath: 'tokens/sass/',
      files: sassFileOutput
    },
    "tokens/css": {
      buildPath: 'tokens/css/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables'
      }],
      transforms: ['name/cti/kebab']
    }
  }
}