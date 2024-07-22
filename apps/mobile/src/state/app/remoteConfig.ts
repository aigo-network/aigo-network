import type { GeolocationOptions } from '@react-native-community/geolocation';
import remoteConfig from '@react-native-firebase/remote-config';

import { appState, defaultRemoteConfig } from './shared';

const minimumFetchIntervalMillis = __DEV__
	? 10000 // 10 seconds for development
	: 3600000; // 1 hour for prod

export const syncRemoteConfig = async () => {
	const startFetch = new Date();
	const fetchedRemotely = await remoteConfig().fetchAndActivate();
	const endFetch = new Date();

	const fetchingDuration = endFetch.valueOf() - startFetch.valueOf();
	console.debug(`Fetching remote config took: ${fetchingDuration} ms`);

	if (fetchedRemotely) {
		console.debug('New configs were retrieved from the backend and activated.');
	} else {
		console.debug('No new remote configs, use activated local configs');
	}

	const conf = remoteConfig().getAll();

	appState.remoteConfig = {
		nyamNyamCampaignActivated: conf.nyamNyamCampaignActivated?.asBoolean(),
		invitationUrl: conf.invitationUrl?.asString(),
		deepAnalyticsEnabled: conf.deepAnalyticsEnabled?.asBoolean(),
		minimalVersion: conf.minimalVersion?.asString() || '1.0.0',
		watchPositionOptions: conf.watchPositionOptions as GeolocationOptions,
	};
};

/**
 * Wait for remote config init/setup, async fetching
 */
export const initRemoteConfigModule = async () => {
	await remoteConfig().setDefaults(defaultRemoteConfig as never);
	await remoteConfig().setConfigSettings({ minimumFetchIntervalMillis });

	// We currently don't need realtime update (has its cost) by using `onConfigUpdated`.

	/**
	 * Not wait for syncRemoteConfig as it takes 700ms in dev (low traffic),
	 * and could much longer in production.
	 */
	syncRemoteConfig();
};
