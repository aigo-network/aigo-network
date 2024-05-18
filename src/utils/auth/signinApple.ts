import { appleAuth } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import { setJWT } from 'api/jwt';

import type { SignInFunction } from './types';

export const signInWithApple: SignInFunction = async () => {
	const appleAuthRequestResponse = await appleAuth.performRequest({
		requestedOperation: appleAuth.Operation.LOGIN,
		requestedScopes: [appleAuth.Scope.FULL_NAME],
	});

	if (!appleAuthRequestResponse.identityToken) {
		throw new Error('Apple Sign-In failed');
	}

	const { identityToken, nonce } = appleAuthRequestResponse;
	const appleCredential = auth.AppleAuthProvider.credential(
		identityToken,
		nonce,
	);
	const { user } = await auth().signInWithCredential(appleCredential);
	const jwt = await auth().currentUser?.getIdToken();
	if (jwt) setJWT(jwt);

	return user;
};
