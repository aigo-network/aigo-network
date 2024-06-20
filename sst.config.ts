import type { SSTConfig } from 'sst';

import webApp from './apps/web/sst';

export default {
	config() {
		return {
			name: 'aigo',
			region: 'ap-south-1',
		};
	},
	stacks(app) {
		app.stack(webApp);
	},
} satisfies SSTConfig;
