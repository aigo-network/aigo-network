import type { SSTConfig } from 'sst';

import webApp from './apps/quest/sst';
import ride from './apps/ride/sst';

export default {
	config() {
		return {
			name: 'aigo',
			region: 'ap-south-1',
		};
	},
	stacks(app) {
		app.stack(webApp);
		app.stack(ride);
	},
} satisfies SSTConfig;
