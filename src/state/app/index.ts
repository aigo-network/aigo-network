import type { User } from 'api/graphql';

import { appState } from './shared';
import type { Onboarding } from './types';

export const appActions = {
	setAppUser: (user: User) => {
		appState.appUser = user;
	},
	updateOnboarding: (obj: Partial<Onboarding>) => {
		appState.onboarding = { ...appState.onboarding, ...obj };
	},
};

export { appState } from './shared';
