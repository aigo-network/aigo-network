import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import type { DailyCheckIn, User } from 'api/graphql';
import type { PhoneNumber } from 'libphonenumber-js';
import type { LangKey } from 'utils/translations';
import { translations } from 'utils/translations';

import {
	initTranslationModule,
	setAppLanguage,
	showLanguageSelection,
} from './language';
import { appState } from './shared';
import type { Onboarding } from './types';

export const appActions = {
	setAppLanguage,
	showLanguageSelection,
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
	updatePhoneSignIn: (
		phoneNumber: PhoneNumber,
		confirmation: FirebaseAuthTypes.ConfirmationResult,
	) => {
		appState.phoneSignIn = {
			phoneNumber,
			confirmation,
		};
	},
};

export { appState } from './shared';
