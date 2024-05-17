import auth from '@react-native-firebase/auth';
import type { User } from 'api/graphql';
import { graphqlClient } from 'api/graphql';
import { setJWT } from 'api/jwt';
import { appActions } from 'state/app';

auth().onIdTokenChanged(async (authUser) => {
	if (authUser) {
		const jwt = await authUser.getIdToken();
		if (jwt) setJWT(jwt);

		if (initAuthResolved) return;

		try {
			const { user } = await graphqlClient.completeOnboarding();
			if (user) {
				appActions.setAppUser(user);
				resolveInitAuthPromise(user);
			} else {
				resolveInitAuthPromise(undefined);
			}
		} catch (err) {
			console.log('Failed to resolve client from API:', err);
		}
	} else {
		setJWT('');
		resolveInitAuthPromise(undefined);
	}
});

let initAuthResolved = false;
let resolveInitAuthPromise: (user: User | undefined) => void;
export const initAuthPromise = new Promise<User | undefined>((resolve) => {
	resolveInitAuthPromise = (user) => {
		resolve(user);
		initAuthResolved = true;
	};
});

export * from './signinApple';
export * from './signinGoogle';
export * from './types';
