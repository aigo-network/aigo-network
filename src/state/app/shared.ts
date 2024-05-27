import DeviceInfo from 'react-native-device-info';
import type { User } from 'api/graphql';
import { type Content, translations } from 'utils/translations';
import { proxy } from 'valtio';

import type { Onboarding } from './types';

interface AppState {
	appUser?: User;
	onboarding: Partial<Onboarding>;
	content: Content;
	version: string;
	buildNumber: string;
}

export const initAppState: AppState = {
	onboarding: {},
	content: translations.en,
	version: DeviceInfo.getVersion(),
	buildNumber: DeviceInfo.getBuildNumber(),
};

export const appState = proxy<AppState>(initAppState);
