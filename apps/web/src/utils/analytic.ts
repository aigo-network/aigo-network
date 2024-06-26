import { getAnalytics, isSupported, logEvent } from 'firebase/analytics';

import { app } from './auth';

/* eslint-disable-next-line */
let analytics: any;

isSupported().then((supported) => {
	if (supported) {
		analytics = app ? getAnalytics(app) : null;
	}
});

export const tracker = {
	logEvents: (name: string, params: Record<string, unknown>) => {
		if (!analytics) return;
		logEvent(analytics, name, { ...params, app_id: 'quest' });
	},
	logScreenView: (firebase_screen: string, firebase_screen_class: string) => {
		if (!analytics) return;
		return logEvent(analytics, 'screen_view', {
			firebase_screen,
			firebase_screen_class,
			app_id: 'quest',
		});
	},
};
