import { graphqlClient } from '@aigo/api/graphql';
import { AppStage as AppStageFromAPI } from '@aigo/api/graphql';
import crashlytics from '@react-native-firebase/crashlytics';
import { getStateFromPath } from '@react-navigation/native';
import { appState } from 'state/app';
import { AppStage, getCurrentAppStage } from 'state/app/system';

import { linking } from './linking';
import { checkPrefixFromURL } from './utils';

/**
 * Call this function as a background promise.
 * Handle deferred deep link when navigating in first-time app opening (just download)
 */
export const startDeferredDeepLinkHandler = async () => {
	const stage = await getCurrentAppStage();
	if (stage === AppStage.INITIALIZING) {
		// retrieve and handle deferred DeepLink if it is available
		const { deferredLinking } = await graphqlClient.retrieveDeferredLinking();
		if (!deferredLinking || !deferredLinking.url) return;

		handleDeepLink(deferredLinking.url);
	}
};

const appStageMap = {
	[AppStage.INITIALIZING]: AppStageFromAPI.FirstTimeOpen,
	[AppStage.INITIALIZED]: AppStageFromAPI.Normal,
};

/**
 * Generally handle deep link
 */
export const handleDeepLink = async (deeplink: string) => {
	try {
		const stage = await getCurrentAppStage();
		await graphqlClient.trackAppOpenWithLinkingEvent({
			url: deeplink,
			appStage: appStageMap[stage],
		});
		console.debug('Tracked app open event with linking');
	} catch (error) {
		crashlytics().recordError(error as Error, 'trackAppOpenWithLinking');
	}

	try {
		const url = new URL(deeplink);
		const isValidURLPrefix = checkPrefixFromURL(linking, url);
		if (!isValidURLPrefix) return;

		const state = getStateFromPath(url.pathname, linking.config);
		if (!state || state.routes.length === 0 || !state.routes[0]) return;

		const rootRoute = state.routes[0];
		if (rootRoute.name === 'Open') {
			const inviteCode = url.searchParams.get('inviteCode');
			if (inviteCode) appState.pendingInviteCode = inviteCode;
		}
	} catch (error) {
		crashlytics().recordError(error as Error, 'handleDeepLink');
	}
};
