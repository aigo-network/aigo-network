import { getAnalytics, logEvent } from 'firebase/analytics';

import { app } from './auth';

export const analytics = app ? getAnalytics(app) : null;

export const tracker = {
	logEvents: (name: string, params: Record<string, unknown>) => {
		if (!analytics) return;
		logEvent(analytics, name, { ...params, appId: 'quest' });
	},
	logScreenView: (firebase_screen: string, firebase_screen_class: string) => {
		if (!analytics) return;
		return logEvent(analytics, 'screen_view', {
			firebase_screen,
			firebase_screen_class,
			appId: 'quest',
		});
	},
};
