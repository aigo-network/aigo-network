import { Linking } from 'react-native';
import type { LinkingOptions } from '@react-navigation/native';

export const linking: LinkingOptions<RootStackParamList> = {
	prefixes: ['network.aigo.app://'],
	config: {
		screens: {
			Profile: 'profile',
		},
	},
	getInitialURL: async () => {
		// Check if app was opened from a deep link
		const url = await Linking.getInitialURL();
		if (url) {
			console.log('Open by initial URL', url);
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
