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
		emptyOutDir: true
	},
	server: {
		open: true
	}
};
