import type { User } from '@aigo/api/graphql';
import { graphqlClient } from '@aigo/api/graphql';
import { injectGetJWTFunc } from '@aigo/api/jwt';
import auth from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import { appActions } from 'state/app';
import { cleanDefaultUserInfo } from 'state/app/userInfo';

injectGetJWTFunc(async () => {
	return await auth().currentUser?.getIdToken();
});

auth().onIdTokenChanged(async (authUser) => {
	if (authUser) {
		crashlytics().setUserId(authUser.uid);

		try {
			const { user } = await graphqlClient.getUserWitDailyMissions();
			if (user) {
				crashlytics().setAttributes({
					email: authUser.email || 'unknown@aigo.network',
					username: user.name || 'unknown',
					goPoints: String(user.GOPoints),
				});

				appActions.setAppUser(user);
				resolveInitAuthPromise(user);
			} else {
				resolveInitAuthPromise(undefined);
			}
		} catch (err) {
			await logOut();
			crashlytics().recordError(err as Error);
			console.log('Failed to resolve client from API:', err);
		}
	} else {
		resolveInitAuthPromise(undefined);
	}
});

let resolveInitAuthPromise: (user: User | undefined) => void;

export let initAuthPromise = new Promise<User | undefined>((resolve) => {
	resolveInitAuthPromise = (user) => {
		resolve(user);
	};
});

export const logOut = async () => {
	initAuthPromise = new Promise<User | undefined>((resolve) => {
		resolveInitAuthPromise = (user) => {
			resolve(user);
		};
	});

	await auth().signOut();
	await cleanDefaultUserInfo();
	appActions.cleanState();
};

export * from './signinApple';
export * from './signinGoogle';
export * from './types';
