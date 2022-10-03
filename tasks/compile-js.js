const license = require('./license')
const rollup = require('rollup')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { terser } = require('rollup-plugin-terser')

async function compile() {
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

    console.log('Compiling UMD module...')
  
    await bundle.write({
      file: './static/js/rivet-umd.js',
      format: 'umd',
      name: 'Rivet'
    })

    console.log('Compiling IIFE...')

    await bundle.write({
      file: './static/js/rivet-iife.js',
      format: 'iife',
      name: 'Rivet'
    })

    console.log('Compiling ES module...')

    await bundle.write({
      file: './static/js/rivet-esm.js',
      format: 'es',
      name: 'Rivet'
    })
  } catch (error) {
    throw new Error(error)
  }
}

compile()