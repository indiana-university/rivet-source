'use strict';

/*
* Require the path module
*/
const path = require('path');

/**
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();

/**
 * Use the default mandelbrot theme.
 */
const mandelbrot = require('@frctl/mandelbrot'); // require the Mandelbrot theme

/**
 * Use this to customize the default theme
 */
const myCustomizedTheme = mandelbrot({
    lang: 'en-US',
    skin: 'white',
    format: 'yaml',
    // which panels to show
    // http://fractal.build/guide/web/default-theme#panels
    panels: [
      'notes',
      'html',
      'resources',
      'info',
    ],
    /**
     * Show Docs before Components
     * http://fractal.build/guide/web/default-theme#nav
     */
    nav: ["docs", "components"],
    scripts: [
        'default',
        '/js/vendor.js'
    ]
});

/**
 * Use the customized theme.
 */
fractal.web.theme(myCustomizedTheme);

/**
 * Give your project a title.
 */
fractal.set('project.title', 'Rivet');

fractal.components.engine('@frctl/nunjucks');

/**
 * Tell Fractal where to look for components.
 */

fractal.components.set('ext', '.njk');

fractal.components.set('path', path.join(__dirname, 'src/components'));

fractal.components.set('statuses', {
    deprecated: {
        label: "Deprecated",
        description: "Don't use this in new projects. This component will be removed in the next major version of Rivet.",
        color: '#F25B19'
    },
    alpha: {
        label: "Alpha",
        description: "Use with caution. This component will change.",
        color: '#F5BB17'
    },
    beta: {
        label: "Beta",
        description: "This component is stable, but could still change slightly.",
        color: '#49AFC7'
    },
    ready: {
        label: "Ready",
        description: "This component is ready to use in production.",
        color: '#009933'
    }
});

/**
 * This sets up the default preview layout that's used to render the component
 * preview. You can find the preview template in the root of src/components/
 */
fractal.components.set('default.preview', '@preview');

/**
 * Sets the default component status to "wip"
 */
fractal.components.set('default.status', 'alpha');

/**
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, 'src/docs'));

/**
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, 'static'));

/**
 * Set a destination for Fractal to build out the stat UI for the components.
 */
fractal.web.set('builder.dest', '_build');



const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility
