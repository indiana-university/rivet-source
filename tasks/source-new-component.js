/******************************************************************************
 * Copyright (C) 2022 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

const jetpack = require('fs-jetpack')
const { exec } = require('child_process')

/******************************************************************************
 * Should the script only generate Sass files for the new component?
 *****************************************************************************/

const sassOnly = process.argv.includes('sass-only')

/******************************************************************************
 * Extract component name and file paths.
 *****************************************************************************/

const componentName = process.argv[2].trim()
const componentSlug = componentName.toLowerCase().replace(/\s/g, '-')
const componentClassName = componentName.replace(/\s/g, '')
const componentLowercaseName = componentName.toLowerCase()
const componentSassIndexPath = `./src/sass/${componentSlug}/_index.scss`
const componentSassBasePath = `./src/sass/${componentSlug}/_base.scss`
const componentJsPath = `./src/js/components/${componentSlug}.js`

const componentSassStarterCode = jetpack
                                .read('./tasks/component-starter-code.scss.txt')
                                .replace(/{{ slug }}/gi, componentSlug)

const componentJsStarterCode = jetpack
                               .read('./tasks/component-starter-code.js.txt')
                               .replace(/{{ slug }}/gi, componentSlug)
                               .replace(/{{ className }}/gi, componentClassName)
                               .replace(/{{ lowercaseName }}/gi, componentLowercaseName)

/******************************************************************************
 * Create Sass boilerplate files.
 *****************************************************************************/

jetpack.write(componentSassIndexPath, `@forward 'base';`)
console.log(`Wrote file for new component "${componentName}" to src/sass/${componentSlug}/_index.scss.`)

jetpack.write(componentSassBasePath, componentSassStarterCode)
console.log(`Wrote file for new component "${componentName}" to src/sass/${componentSlug}/_base.scss.`)

/******************************************************************************
 * Create JS boilerplate file.
 *****************************************************************************/

if ( ! sassOnly) {
  jetpack.write(componentJsPath, componentJsStarterCode)
  console.log(`Wrote file for new component "${componentName}" to src/js/components/${componentSlug}.js.`)
}

/******************************************************************************
 * Open new files in VSCode.
 *****************************************************************************/

exec(`code -r ${componentSassBasePath}`)

if ( ! sassOnly)
  exec(`code -r ${componentJsPath}`)