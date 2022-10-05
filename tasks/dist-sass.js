const jetpack = require('fs-jetpack')

console.log('Copying Sass files to distribution folder...')

jetpack.copy('./src/sass', './sass', { 
  overwrite: true,
  matching: '*.scss'
})