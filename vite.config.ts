import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [
		sveltekit()
  ],
	build: {
		commonjsOptions: { include: [] }
	},
	optimizeDeps: {
		disabled: false
	}
};

export default config;
