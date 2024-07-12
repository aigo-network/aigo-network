import { graphqlClient } from '@aigo/api/graphql';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import { showReferralPoint } from 'screens/Profile/shared';
import { appActions } from 'state/app';

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
