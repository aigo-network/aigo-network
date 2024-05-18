import type { DailyCheckIn, User } from 'api/graphql';

import { appState } from './shared';
import type { Onboarding } from './types';

export const appActions = {
	setAppUser: (user: User) => {
		appState.appUser = user;
	},
	updateOnboarding: (obj: Partial<Onboarding>) => {
		appState.onboarding = { ...appState.onboarding, ...obj };
	},
	updateCheckIn: (checkIn: DailyCheckIn) => {
		if (appState.appUser?.dailyMissions) {
			appState.appUser.dailyMissions.checkIn = checkIn;
		} else if (appState.appUser) {
			appState.appUser.dailyMissions = { checkIn };
		}
	},
};

export { appState } from './shared';
