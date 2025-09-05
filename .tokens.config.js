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
    "src/sass/core/tokens": {
      transformGroup: 'scss',
      buildPath: 'src/sass/core/',
      prefix: 'rvt',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables'
        }
      ]
    },
    "dist": {
      transformGroup: 'js',
      buildPath: 'dist',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/flat'
        }
      ],
      transforms: ['name/kebab']
    }
  }
}