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
				return;
			}
		} catch (err) {
			await logOut();
			crashlytics().recordError(err as Error, 'resolveUser');
			console.debug('Failed to resolve client from API:', err);
		}
	}

	// attempt to resolve auth promise with undefined
	// if having no resolved user or fetching error
	resolveInitAuthPromise(undefined);
});

let resolveInitAuthPromise: (user: User | undefined) => void;

export let initAuthPromise = new Promise<User | undefined>((resolve) => {
	resolveInitAuthPromise = (user) => {
		resolve(user);
	};

	const authPromiseTimeout = 10000;

	setTimeout(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const resolved = (initAuthPromise as any)._j !== null;
		if (!resolved) {
			console.debug('Init auth timeout, resolved');
			resolve(undefined);
		}
	}, authPromiseTimeout);
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
