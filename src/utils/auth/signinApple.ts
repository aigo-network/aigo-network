import { Platform } from 'react-native';
import uuid from 'react-native-uuid';
import {
	appleAuth,
	appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import { setJWT } from 'api/jwt';
import { config } from 'utils/config';

import type { SignInFunction } from './types';

export const signInWithApple: SignInFunction = async () => {
	let identityToken: string | undefined | null;
	let nonce: string | undefined = uuid.v4() as string;

	if (Platform.OS === 'ios') {
		const authResponse = await appleAuth.performRequest({
			requestedOperation: appleAuth.Operation.LOGIN,
			requestedScopes: [appleAuth.Scope.FULL_NAME],
		});

		identityToken = authResponse.identityToken;
		nonce = authResponse.nonce;
	} else if (Platform.OS === 'android') {
		console.log(config.FIREBASE_APPLE_AUTH_SERVICE_ID, '<-- serviceId');
		console.log(config.FIREBASE_APPLE_AUTH_REDIRECT_URL, '<-- redirectUri');
		appleAuthAndroid.configure({
			clientId: config.FIREBASE_APPLE_AUTH_SERVICE_ID,
			redirectUri: config.FIREBASE_APPLE_AUTH_REDIRECT_URL,
			responseType: appleAuthAndroid.ResponseType.ALL,
			scope: appleAuthAndroid.Scope.NAME,
			nonce,
			state: uuid.v4() as string,
		});
		const authResponse = await appleAuthAndroid.signIn();

		identityToken = authResponse.id_token;
		nonce = authResponse.nonce;
	}

	if (!identityToken) {
		throw new Error('Apple Sign-In failed');
	}

	const appleCredential = auth.AppleAuthProvider.credential(
		identityToken,
		nonce,
	);
	const { user } = await auth().signInWithCredential(appleCredential);
	const jwt = await auth().currentUser?.getIdToken();
	if (jwt) setJWT(jwt);

	return user;
};
