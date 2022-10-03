const license = require('./license')
const rollup = require('rollup')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { terser } = require('rollup-plugin-terser')

async function compile() {
  console.log('Compiling IIFE...')

  try {
    const bundle = await rollup.rollup({
      input: './src/js/index.js',
      plugins: [
        nodeResolve(),
        terser({
          format: {
            comments: false,
            preamble: license
          }
        })
      ]
    })
  
    await bundle.write({
      file: './static/js/rivet-umd.js',
      format: 'umd',
      name: 'Rivet'
    })
  } catch (error) {
    throw new Error(error)
  }
}

compile()