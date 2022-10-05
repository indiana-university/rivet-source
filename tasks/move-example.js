const jetpack = require('fs-jetpack')

console.log('Copying starter file to distribution folder...')

jetpack.copy('./src/components/_extras/_index-example.html', './index.html', { overwrite: true })