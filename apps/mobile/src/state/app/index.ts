import type { DailyCheckIn, User } from '@aigo/api/graphql';
import { graphqlClient } from '@aigo/api/graphql';
import crashlytics from '@react-native-firebase/crashlytics';
import type { PhoneNumber } from 'libphonenumber-js';
import type { LangKey } from 'utils/translations';
import { translations } from 'utils/translations';

import { initTranslationModule, setAppLanguage } from './language';
import { initRemoteConfigModule } from './remoteConfig';
import { appState } from './shared';
import type { Onboarding } from './types';

export const appActions = {
	setAppLanguage,
	initTranslationModule,
	initRemoteConfigModule,
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
	updatePhoneNumber: (phoneNumber: string, verified: boolean) => {
		if (appState.appUser) {
			appState.appUser.phoneNumber = phoneNumber;
			appState.appUser.phoneNumberVerified = verified;
		}
	},
	queryAndUpdateGOPoints: async () => {
		try {
			const { user } = await graphqlClient.getUserGOPoints();
			const GOPoints = user?.GOPoints;
			if (GOPoints !== 0 && !GOPoints) {
				return;
			}

			if (appState.appUser) appState.appUser.GOPoints = GOPoints;
		} catch (error) {
			crashlytics().recordError(error as Error, 'queryAndUpdateGOPoints');
		}
	},
};

export { appState, userDescriptions } from './shared';
