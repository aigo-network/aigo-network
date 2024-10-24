import { config } from '@aigo/config';
import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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

	analytics().logLogin({ method: 'Google' });

	return user;
};
