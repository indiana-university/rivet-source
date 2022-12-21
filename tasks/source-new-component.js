/******************************************************************************
 * Copyright (C) 2022 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

const jetpack = require('fs-jetpack')
const { exec } = require('child_process')

const componentName = process.argv[2].trim()
const componentSlug = componentName.toLowerCase().replace(/\s/g, '-')
const componentClassName = componentName.replace(/\s/g, '')
const componentLowercaseName = componentName.toLowerCase()
const componentPath = `./src/js/components/${componentSlug}.js`
const componentStarterCode = jetpack
                               .read('./tasks/component-starter-code.js.txt')
                               .replace(/{{ slug }}/gi, componentSlug)
                               .replace(/{{ className }}/gi, componentClassName)
                               .replace(/{{ lowercaseName }}/gi, componentLowercaseName)

jetpack.write(componentPath, componentStarterCode)

console.log(`Wrote files for new component "${componentName}" to src/js/components/${componentSlug}.js.`)

exec(`code -r ${componentPath}`)