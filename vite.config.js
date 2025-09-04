import { execSync } from 'child_process';
import { eleventyPlugin } from 'vite-plugin-eleventy';

export default {
	root: 'src/sandbox',
	plugins: [
		{
			name: 'style-dictionary-plugin',
			buildStart() {
				execSync('npm run build:tokens', { stdio: 'inherit' });
			}
		},
		eleventyPlugin()
	],
	build: {
		outDir: '../../dist',
		emptyOutDir: true,
		/*
		lib: {
			entry: '../js/index.js',
			name: 'Rivet',
			fileName: (format) => `rivet-${format}.js`,
			formats: ['es', 'esm', 'iife', 'umd']
		}
		*/
	},
	server: {
		open: true
	}
};

/*
export default {
	root: 'src/sandbox',
	plugins: [
		{
			name: 'style-dictionary-plugin',
			buildStart() {
				execSync('npm run build:tokens', { stdio: 'inherit' });
			}
		},
		eleventyPlugin()
	],
	build: {
		outDir: '../../dist',
		emptyOutDir: true,
		lib: {
			entry: 'src/js/index.js',
			name: 'Rivet',
			fileName: (format) => `rivet.${format}.js`,
			//formats: ['es', 'umd']
			formats: ['es']
		},
		rollupOptions: {
			output: {
				inlineDynamicImports: false,
				manualChunks: () => null
			}
		}
	},
	server: {
		open: true
	}
};
*/
