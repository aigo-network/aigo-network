import { Linking } from 'react-native';
import { type LinkingOptions } from '@react-navigation/native';

import { handleDeepLink } from './deeplink';

export const linking: LinkingOptions<RootStackParamList> = {
	prefixes: [
		'network.aigo.app://',
		'https://ride.aigo.network',
		'https://*.ride.aigo.network',
	],
	config: {
		screens: {
			Open: 'open',
		},
	},
	getInitialURL: async () => {
		// Check if app was opened from a deep link
		const url = await Linking.getInitialURL();
		if (url) {
			console.log('Open by initial URL', url);
			await handleDeepLink(url);
		}

		return url;
	},
	subscribe: (listener) => {
		Linking.addEventListener('url', ({ url }) => {
			console.log('Open when app opened with URL', url);
			listener(url);
		});

		return () => Linking.removeAllListeners('url');
	},
};

export type RootStackParamList = {
	Splash: undefined;
	Open: {
		from?: string;
		/** use with `from === "quest-site"` */
		questProfileId?: string;

		inviteCode?: string;
	};
	Login: undefined;
	PhoneLogin: undefined;
	OtpInput: undefined;
	OnboardName: undefined;
	OnboardDescription: undefined;
	OnboardCity: undefined;
	Home: undefined;
	Profile: undefined;
	VerifyNNID: undefined;
	VerifyPhoneNumber: undefined;
	VerifyOTP: undefined;
};

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}
