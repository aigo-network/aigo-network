import DeviceInfo from 'react-native-device-info';
import type { User } from '@aigo/api/graphql';
import type { PhoneNumber } from 'libphonenumber-js';
import { type Content, translations } from 'utils/translations';
import { proxy } from 'valtio';

import type { Onboarding } from './types';

interface AppState {
	appUser?: User;
	onboarding: Partial<Onboarding>;
	content: Content;
	version: string;
	buildNumber: string;
	phoneSignIn: {
		phoneNumber?: PhoneNumber;
	};
}

export const initAppState: AppState = {
	onboarding: {},
	content: translations.en,
	version: DeviceInfo.getVersion(),
	buildNumber: DeviceInfo.getBuildNumber(),
	phoneSignIn: {},
};

export const appState = proxy<AppState>(initAppState);
