import DeviceInfo from 'react-native-device-info';
import type { User } from '@aigo/api/graphql';
import { UserDescription } from '@aigo/api/graphql';
import type { PhoneNumber } from 'libphonenumber-js';
import type { Content } from 'utils/translations';
import { translations } from 'utils/translations';
import { proxy } from 'valtio';

import type { Onboarding, RemoteConfig } from './types';

interface AppState {
	appUser?: User;
	onboarding: Partial<Onboarding>;
	content: Content;
	version: string;
	buildNumber: string;
	phoneSignIn: {
		phoneNumber?: PhoneNumber;
	};

	remoteConfig: RemoteConfig;

	/**
	 * coming from deeplink
	 */
	pendingInviteCode?: string;
}

export const defaultRemoteConfig: RemoteConfig = {
	nyamNyamCampaignActivated: true,
	invitationUrl: 'https://ride.aigo.network/open',
	deepAnalyticsEnabled: true,
	minimalVersion: '1.0.0',

	// ref: https://github.com/michalchudziak/react-native-geolocation?tab=readme-ov-file#watchposition
	watchPositionOptions: {
		enableHighAccuracy: true,
		distanceFilter: 1,
		maximumAge: 0,
	},
};

export const initAppState: AppState = {
	onboarding: {},
	content: translations.en,
	version: DeviceInfo.getVersion(),
	buildNumber: DeviceInfo.getBuildNumber(),
	phoneSignIn: {},
	remoteConfig: defaultRemoteConfig,
};

export const appState = proxy<AppState>(initAppState);

export const userDescriptions = () => {
	const descriptions =
		appState.content.screens.onboard.userDescriptions.descriptions;

	return [
		{
			label: descriptions.NyamNyamDriver,
			value: UserDescription.NyamNyamDriver,
		},
		{
			label: descriptions.CityExplorer,
			value: UserDescription.CityExplorer,
		},
		{
			label: descriptions.FitnessEnthusiast,
			value: UserDescription.FitnessEnthusiast,
		},
		{
			label: descriptions.Commuter,
			value: UserDescription.Commuter,
		},
		{
			label: descriptions.Traveler,
			value: UserDescription.Traveler,
		},
		{
			label: descriptions.CasualUser,
			value: UserDescription.CasualUser,
		},
	];
};
