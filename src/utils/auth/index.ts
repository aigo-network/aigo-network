export * from './signinApple';
export * from './signinGoogle';

import auth from '@react-native-firebase/auth';
import type { User } from 'api/graphql';
import { graphqlClient } from 'api/graphql';
import { appActions } from 'state/app';

auth().onIdTokenChanged(async (authUser) => {
	if (authUser) {
		const { user } = await graphqlClient.completeOnboarding();
		console.log(user?.id, '<--');
		console.log('resolve');
		if (user) {
			appActions.setAppUser(user);
			resolveAuthPromise(user);
		} else {
			resolveAuthPromise(undefined);
		}
	} else {
		resolveAuthPromise(undefined);
	}
});

let resolveAuthPromise: (user: User | undefined) => void;
export const authPromise = new Promise<User | undefined>((resolve) => {
	resolveAuthPromise = resolve;
});
