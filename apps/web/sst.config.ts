import type { SSTConfig } from 'sst';
import { NextjsSite } from 'sst/constructs';

export default {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	config(_input) {
		return {
			name: 'app.aigo.network',
			region: 'ap-southeast-2',
		};
	},
	stacks(app) {
		app.stack(function Site({ stack }) {
			const site = new NextjsSite(stack, 'site');

			stack.addOutputs({
				SiteUrl: site.url,
			});
		});
	},
} satisfies SSTConfig;
