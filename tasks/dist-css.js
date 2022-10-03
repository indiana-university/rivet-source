const jetpack = require('fs-jetpack')

console.log('Copying compiled CSS files to distribution folder...')

jetpack.copy('./static/css/rivet.css', './css/rivet.css', { overwrite: true })
jetpack.copy('./static/css/rivet.min.css', './css/rivet.min.css', { overwrite: true })