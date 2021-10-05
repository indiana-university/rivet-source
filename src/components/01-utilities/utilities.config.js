const colorTokens = require( '../../tokens/colors.json')
const spacingTokens = require('../../tokens/spacing.json')
const typeScaleTokens = require('../../tokens/type-scale.json')
const zIndexTokens = require('../../tokens/z-index.json')

module.exports = {
  title: "Utilities",
  status: "ready",
  root: true,
  collated: false,
  context: {
    borders: [
      'top',
      'right',
      'bottom',
      'left',
      'all',
      'radius'
    ],
    colors: colorTokens.color,
    spacings: spacingTokens.spacing,
    typeScale: typeScaleTokens.ts,
    zIndexes: zIndexTokens['z-index']
  }
}