import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { config } from 'utils/config';

import type { SignInFunction } from './types';

GoogleSignin.configure({
	webClientId: config.GOOGLE_SIGNIN_CLIENT_ID,
});

export const signInWithGoogle: SignInFunction = async () => {
	const { idToken } = await GoogleSignin.signIn();

	if (!idToken) {
		throw new Error('Google Sign-In failed');
	}

	const googleCredential = auth.GoogleAuthProvider.credential(idToken);
	const { user } = await auth().signInWithCredential(googleCredential);
	return user;
};
