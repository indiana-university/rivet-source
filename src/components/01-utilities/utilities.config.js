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
    flexText: [
      "One",
      "Two",
      "Three",
      "Four",
      "Five"
    ],
    colors: colorTokens,
    spacings: spacingTokens.spacing,
    typeScale: typeScaleTokens.ts,
    zIndexes: zIndexTokens
  }
}