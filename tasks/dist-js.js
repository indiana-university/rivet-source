const jetpack = require('fs-jetpack')

console.log('Copying compiled JS files to distribution folder...')

jetpack.copy('./static/js/rivet-umd.js', './js/rivet-umd.js', { overwrite: true })
jetpack.copy('./static/js/rivet-esm.js', './js/rivet-esm.js', { overwrite: true })
jetpack.copy('./static/js/rivet-iife.js', './js/rivet-iife.js', { overwrite: true })
jetpack.copy('./static/js/rivet-iife.js', './js/rivet.min.js', { overwrite: true })