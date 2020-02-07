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
    "tokens/commonjs": {
      "buildPath": "tokens/commonjs/",
      "transformGroup": "js",
      "files": [
        {
          "format": "javascript/module",
          "destination": "variables.commonjs.js",
          "options": {
            "showFileHeader": false
          }
        }
      ]
    },
    "tokens/css": {
      "buildPath": "tokens/css/",
      "transformGroup": "js",
      "files": [
        {
          "format": "css/variables",
          "destination": "variables.css",
          "options": {
            "showFileHeader": false
          }
        }
      ]
    },
    "tokens/es6": {
      "buildPath": "tokens/es6/",
      "transformGroup": "js",
      "files": [
        {
          "format": "javascript/es6",
          "destination": "variables.es6.js",
          "options": {
            "showFileHeader": false
          }
        }
      ]
    },
    "tokens/javascript-object": {
      "buildPath": "tokens/javascript/",
      "transformGroup": "js",
      "files": [
        {
          "format": "json",
          "destination": "variables.object.js",
          "options": {
            "showFileHeader": false
          }
        }
      ]
    },
    "tokens/json": {
      "buildPath": "tokens/json/",
      "transformGroup": "js",
      "files": [
        {
          "format": "json",
          "destination": "variables.json",
          "options": {
            "showFileHeader": false
          }
        }
      ]
    },
    "tokens/less": {
      "buildPath": "tokens/less/",
      "transformGroup": "less",
      "files": [
        {
          "destination": "variables.less",
          "format": "less/variables",
          "options": {
            "showFileHeader": false
          }
        }
      ]
    },
    "tokens/sass": {
      transformGroup: 'scss',
      buildPath: 'tokens/sass/',
      files: sassFileOutput
    }
  }
}