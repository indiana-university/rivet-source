module.exports = [
  {
    destination: 'variables.scss',
    format: 'rvt/scss/variables'
  },
  {
    destination: 'maps/breakpoints.scss',
    filter: 'isBreakpoint',
    format: 'rvt/scss/map-simple',
    mapName: 'breakpoints'
  },
  {
    destination: 'maps/color.scss',
    filter: 'isColor',
    format: 'rvt/scss/map-simple-desc',
    mapName: 'colors'
  },
  {
    destination: 'maps/font-size.scss',
    filter: 'isFontSize',
    format: 'rvt/scss/map-simple',
    mapName: 'font-size'
  },
  {
    destination: 'maps/line-height.scss',
    filter: 'isLineHeight',
    format: 'rvt/scss/map-simple',
    mapName: 'line-height'
  },
  {
    destination: 'maps/width.scss',
    filter: 'isWidth',
    format: 'rvt/scss/map-simple',
    mapName: 'widths'
  },
  {
    destination: 'maps/z-index.scss',
    filter: 'isZIndex',
    format: 'rvt/scss/map-simple',
    mapName: 'z-index'
  }
];
