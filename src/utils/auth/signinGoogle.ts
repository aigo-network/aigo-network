import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { setJWT } from 'api/jwt';
import { config } from 'utils/config';

import type { SignInFunction } from './types';

GoogleSignin.configure({
	webClientId: config.FIREBASE_WEB_CLIENT_ID,
	iosClientId: config.FIREBASE_IOS_CLIENT_ID, // optional
	offlineAccess: true,
});

export const signInWithGoogle: SignInFunction = async () => {
	const { idToken } = await GoogleSignin.signIn();

	if (!idToken) {
		throw new Error('Google Sign-In failed');
	}

	const googleCredential = auth.GoogleAuthProvider.credential(idToken);
	const { user } = await auth().signInWithCredential(googleCredential);
	const jwt = await auth().currentUser?.getIdToken();
	if (jwt) setJWT(jwt);

	return user;
};
