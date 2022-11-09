/******************************************************************************
 * Copyright (C) 2022 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 *****************************************************************************/

const jetpack = require('fs-jetpack')

const componentName = process.argv[2]
const componentSlug = componentName.trim().toLowerCase().replace(/\s/g, '-')

const indexFrontMatter = `---
title: ${componentName}
component: ${componentSlug}
tags: component
layout: layouts/component.njk
---`

const defaultVariantContent = `---
tags: ${componentSlug}
title: Default ${componentName.toLowerCase()}
layout: layouts/preview.njk
permalink: /components/preview/{{ title | slug}}/
padding: true
order: 1
---
<div></div>
`

jetpack.write('./src/sandbox/components/' + componentSlug + '/index.njk', indexFrontMatter)
jetpack.write('./src/sandbox/components/' + componentSlug + '/variants/default.njk', defaultVariantContent)

console.log(`Wrote files for new component "${componentName}" to src/sandbox/components/${componentSlug}/.`)