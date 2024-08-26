import { Linking } from 'react-native';
import type { LinkingOptions } from '@react-navigation/native';

import { handleDeepLink } from './deeplink';
import type { RootStackParamList } from './types';

export const linking: LinkingOptions<RootStackParamList> = {
	prefixes: [
		'network.aigo.app://',
		'https://ride.aigo.network',
		'https://*.ride.aigo.network',
	],
	config: {
		screens: {
			BottomTab: {
				screens: {
					Map: '/map',
				},
			},
		},
	},
	getInitialURL: async () => {
		const url = await Linking.getInitialURL();
		if (url) {
			console.debug('Open by initial URL', url);
			await handleDeepLink(url);
		}

		return url;
	},
	subscribe: (listener) => {
		Linking.addEventListener('url', ({ url }) => {
			console.debug('Open when app opened with URL', url);
			listener(url);
		});

		return () => Linking.removeAllListeners('url');
	},
};
