import { execSync } from 'child_process';
import { defineConfig } from 'vite';
import { eleventyPlugin } from 'vite-plugin-eleventy';

const styleDictionaryPlugin = {
	name: 'style-dictionary-plugin',
	buildStart() {
		execSync('npm run build:tokens', { stdio: 'inherit' });
	}
}

const buildConfig = {
	plugins: [
		styleDictionaryPlugin
	],
	build: {
		lib: {
			cssFileName: 'rivet',
			entry: 'src/js/index.js',
			fileName: (format) => `rivet.${format}.js`,
			formats: ['es', 'iife', 'umd'],
			name: 'Rivet'
		}
	}
};

const serveConfig = {
	root: 'src/sandbox',
	plugins: [
		styleDictionaryPlugin,
		eleventyPlugin()
	],
	server: {
		open: true
	}
};

const commandMap = {
	build: buildConfig,
	serve: serveConfig
};

export default defineConfig(({ command }) => commandMap[command]);
