import remoteConfig from '@react-native-firebase/remote-config';

import { appState, defaultRemoteConfig } from './shared';

const minimumFetchIntervalMillis = __DEV__
	? 10000 // 10 seconds for development
	: 3600000; // 1 hour for prod

export const syncRemoteConfig = () => {
	remoteConfig().activate();
	remoteConfig().fetch(); // fetch for next launch

	const conf = remoteConfig().getAll();

	appState.remoteConfig = {
		nyamNyamCampaignActivated: conf.nyamNyamCampaignActivated?.asBoolean(),
		invitationUrl: conf.invitationUrl?.asString(),
		deepAnalyticsEnabled: conf.deepAnalyticsEnabled?.asBoolean(),
		minimalVersion: conf.minimalVersion?.asString() || '1.0.0',
	};
};

export const initRemoteConfigModule = async () => {
	remoteConfig()
		.setDefaults(defaultRemoteConfig)
		.then(async () => {
			await remoteConfig().setConfigSettings({ minimumFetchIntervalMillis });
			syncRemoteConfig();
		});

	return remoteConfig().onConfigUpdated((event, error) => {
		if (error !== undefined) {
			console.log('something went wrong with remote config', error);
		} else {
			syncRemoteConfig();
		}
	});
};
