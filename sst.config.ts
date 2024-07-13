import type { SSTConfig } from 'sst';

import landing from './apps/landing/sst';
import webApp from './apps/quest/sst';

export default {
	config() {
		return {
			name: 'aigo',
			region: 'ap-south-1',
		};
	},
	stacks(app) {
		app.stack(webApp);
		// currently use ride.aigo.network from https://github.com/aigo-network/ride-webflow
		// app.stack(ride);
		app.stack(landing);
	},
} satisfies SSTConfig;
