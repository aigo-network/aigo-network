import DeviceInfo from 'react-native-device-info';
import type { User } from 'api/graphql';
import { proxy } from 'valtio';

import type { Onboarding } from './types';

interface AppState {
	appUser?: User;
	onboarding: Partial<Onboarding>;
	version: string;
	buildNumber: string;
}

export const initAppState: AppState = {
	onboarding: {},
	version: DeviceInfo.getVersion(),
	buildNumber: DeviceInfo.getBuildNumber(),
};

export const appState = proxy<AppState>(initAppState);
