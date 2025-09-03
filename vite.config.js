import { eleventyPlugin } from 'vite-plugin-eleventy';

export default {
	root: 'src',
	plugins: [
		eleventyPlugin()
	],
	build: {
		outDir: '../dist2',
		emptyOutDir: true
	},
	server: {
		open: '/sandbox/'
	}
};
