import DeviceInfo from 'react-native-device-info';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import type { User } from 'api/graphql';
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
		confirmation?: FirebaseAuthTypes.ConfirmationResult;
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
