module.exports = {
  "source": [
    "src/tokens/**/*.json"
  ],
  "platforms": {
    "src/sass/core": {
      transformGroup: 'scss',
      buildPath: 'src/sass/core/',
      files: [
        {
          destination: 'variables.scss',
          format: 'scss/map-deep'
        }
      ]
    },
    "src/sass/core/css-custom-properties": {
      transformGroup: 'scss',
      buildPath: 'src/sass/core/',
      prefix: 'rvt',
      files: [
        {
          destination: 'css-custom-properties.scss',
          format: 'css/variables'
        }
      ]
    },
    "tokens/sass": {
      transformGroup: 'scss',
      buildPath: 'tokens/sass/',
      files: [
        {
          destination: 'variables.scss',
          format: 'scss/map-deep'
        }
      ]
    },
    "tokens/css": {
      buildPath: 'tokens/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables'
        }
      ],
      transforms: ['name/cti/kebab']
    },
    "tokens/json": {
      transformGroup: 'js',
      buildPath: `tokens/json/`,
      files: [
        {
          destination: 'variables.json',
          format: 'json'
        },
        {
          destination: 'variables-flat.json',
          format: 'json/flat'
        }
      ],
      transforms: ['name/cti/kebab']
    }
  }
}