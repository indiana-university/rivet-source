import { execSync } from 'child_process';
import { defineConfig } from 'vite';
import bannerPlugin from 'vite-plugin-banner';
import { eleventyPlugin } from 'vite-plugin-eleventy';
import pkg from './package.json';

const libraryName = 'Rivet';
const fileName = libraryName.toLowerCase();

const styleDictionaryPlugin = {
	name: 'style-dictionary-plugin',
	buildStart() {
		execSync('npm run build:tokens', { stdio: 'inherit' });
	}
};

const license = `/*!
 * ${pkg.name} - @version ${pkg.version}
 *
 * Copyright (C) 2018 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */`;

const buildConfig = {
	plugins: [
		styleDictionaryPlugin,
		bannerPlugin(license)
	],
	build: {
		lib: {
			cssFileName: fileName,
			entry: 'src/js/index.js',
			fileName: () => `${fileName}.js`,
			formats: ['es'],
			name: libraryName
		},
		sourcemap: true
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
