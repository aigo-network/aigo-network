import type { SSTConfig } from 'sst';

import landing from './apps/landing/sst';
import webApp from './apps/quest/sst';
import ride from './apps/ride/sst';

export default {
	config() {
		return {
			name: 'aigo',
			profile: 'aigo',
			region: 'ap-south-1',
		};
	},
	stacks(app) {
		app.stack(webApp);
		app.stack(ride);
		app.stack(landing);
	},
} satisfies SSTConfig;
