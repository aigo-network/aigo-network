import { useEffect } from 'react';
import { graphqlClient } from '@aigo/api/graphql';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import { showReferralPoint } from 'screens/Profile/shared';
import { appState } from 'state/app';
import { appActions } from 'state/app';
import { useSnapshot } from 'valtio';

import { startDeferredDeepLinkHandler } from '../navigation';

/**
 * Background hook for handle deeplink (both deferred deep link and pending handling)
 */
export const useDeepLinkHandler = () => {
	const { appUser, pendingInviteCode } = useSnapshot(appState);

	useEffect(() => {
		startDeferredDeepLinkHandler();
	}, []);

	// handle pending invitation code from deeplink
	useEffect(() => {
		if (appUser?.id && pendingInviteCode) {
			resolvePendingInvitationCode(pendingInviteCode);
			appState.pendingInviteCode = '';
		}
	}, [appUser, pendingInviteCode]);
};

export const resolvePendingInvitationCode = async (code: string) => {
	try {
		console.debug('resolving pendingInviteCode from deep link', code);
		await graphqlClient.inputInvitationCode({ code });
		analytics().logEvent('auto_verify_inv_code');
		console.debug('resolved pendingInviteCode');

		showReferralPoint();

		appActions.queryAndUpdateGOPoints();
	} catch (error) {
		console.debug('Can not resolve pendingInviteCode from deep link', error);
		crashlytics().recordError(
			error as Error,
			'resolvePendingInvitationCodeError',
		);
	}
};
