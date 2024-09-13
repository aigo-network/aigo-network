import type { User } from '@aigo/api/graphql';
import { graphqlClient } from '@aigo/api/graphql';
import { HeaderPrefixEnum, injectGetJWTFunc } from '@aigo/api/jwt';
import auth from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import { appActions } from 'state/app';
import { cleanDefaultUserInfo } from 'state/app/userInfo';
import { cleanEncryptedPrivateKey } from 'state/app/wallet';
import { defaultEmail, defaultName } from 'utils/misc';

injectGetJWTFunc(async () => {
	const jwt = await auth().currentUser?.getIdToken();
	return {
		jwt,
		headerPrefix: HeaderPrefixEnum.BEARER,
	};
});

auth().onIdTokenChanged(async (authUser) => {
	console.debug('Id Token changed', authUser?.uid, authUser?.email);

	if (authUser) {
		crashlytics().setUserId(authUser.uid);

		try {
			const { user } = await graphqlClient.getUserWitDailyMissions();
			if (user) {
				crashlytics().setAttributes({
					email: authUser.email || defaultEmail,
					username: user.name || defaultName,
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
		clearTimeout(timer);
		resolve(user);
	};

	const authPromiseTimeout = 10000;

	const timer = setTimeout(() => {
		console.debug('Init auth timeout, resolved');
		resolve(undefined);
	}, authPromiseTimeout);
});

export const logOut = async () => {
	initAuthPromise = new Promise<User | undefined>((resolve) => {
		resolveInitAuthPromise = (user) => {
			resolve(user);
		};
	});

	await Promise.all([
		auth().signOut(),
		cleanDefaultUserInfo(),
		cleanEncryptedPrivateKey(),
	]);

	appActions.cleanState();
};

/**
 * Returns the email associated with the current Firebase authentication user.
 * Email might come from provider data instead of currentUser email field
 */
export const getAuthEmail = () => {
	const authUser = auth().currentUser;

	if (!authUser) {
		return null;
	} else if (authUser.email) {
		return authUser.email;
	} else if (authUser.providerData.length > 0) {
		for (const index in authUser.providerData) {
			const data = authUser.providerData[index];
			if (data.email) {
				return data.email;
			}
		}
	}

	return null;
};

export * from './signinApple';
export * from './signinGoogle';
export * from './types';
