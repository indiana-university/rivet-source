'use strict';

const path = require('path')
const fractal = (module.exports = require('@frctl/fractal').create())
const mandelbrot = require('@frctl/mandelbrot')

/**
 * Project Settings
 * See more at https://fractal.build/guide/customisation/
 */
fractal.set('project.title', 'Rivet');
fractal.components.engine('@frctl/nunjucks');
fractal.components.set('ext', '.njk');
fractal.components.set('path', path.join(__dirname, 'src/components'));
fractal.components.set('default.preview', '@preview');
fractal.components.set('default.status', 'alpha');
fractal.docs.set('path', path.join(__dirname, 'src/docs'));
fractal.web.set('static.path', path.join(__dirname, 'static'));

/**
 * Custom statuses
 */
fractal.components.set('statuses', {
  deprecated: {
    label: 'Deprecated',
    description:
      "Don't use this in new projects. This component will be removed in the next major version of Rivet.",
    color: '#FF0000'
  },
  wip: {
    label: 'Work in Progress',
    description: 'This component is a work in progress.',
    color: '#FF8C00'
  },
  alpha: {
    label: 'Alpha',
    description: 'Use with caution. This component will change.',
    color: '#F5BB17'
  },
  beta: {
    label: 'Beta',
    description: 'This component is stable, but could still change slightly.',
    color: '#006298'
  },
  ready: {
    label: 'Ready',
    description: 'This component is ready to use in production.',
    color: '#009933'
  }
});

/**
 * Use this to customize the default theme
 */
const myCustomizedTheme = mandelbrot({
  lang: 'en-US',
  skin: {
    name: 'white',
    accent: '#990000',
    complement: '#ffffff',
    links: '#006298'
  },
  format: 'yaml',
  panels: ['notes', 'view', 'html', 'resources', 'info'],
  scripts: ['default', '/js/vendor.js'],
  favicon: '/img/favicon.ico',
  information: [
    {
      label: 'Version',
      value: require('./package.json').version
    },
    {
      label: 'Built on',
      value: new Date(),
      type: 'time',
      format: (value) => {
          return value.toLocaleDateString('en');
      }
    }
  ]
});

fractal.web.theme(myCustomizedTheme);

/**
 * Build settings
 */
fractal.web.set('builder.dest', '_build');

/**
 * BrowserSync options
 */
fractal.web.set('server.syncOptions', {
  open: false
});

const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility
