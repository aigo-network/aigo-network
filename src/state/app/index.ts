import type { DailyCheckIn, User } from 'api/graphql';
import type { PhoneNumber } from 'libphonenumber-js';
import type { LangKey } from 'utils/translations';
import { translations } from 'utils/translations';

import { initTranslationModule, setAppLanguage } from './language';
import { appState } from './shared';
import type { Onboarding } from './types';

export const appActions = {
	setAppLanguage,
	initTranslationModule,
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
	cleanState: () => {
		appState.appUser = undefined;
		appState.onboarding = {};
	},
	updateContentLanguage: (key: LangKey) => {
		appState.content = translations[key];
	},
	updatePhoneSignIn: (phoneNumber: PhoneNumber) => {
		appState.phoneSignIn = {
			phoneNumber,
		};
	},
};

export { appState } from './shared';
