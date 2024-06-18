import type { SSTConfig } from 'sst';

import webApp from './apps/web/sst';

export default {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	config(_input) {
		return {
			name: 'aigo',
			region: 'ap-south-1',
		};
	},
	stacks(app) {
		app.stack(webApp);
	},
} satisfies SSTConfig;
