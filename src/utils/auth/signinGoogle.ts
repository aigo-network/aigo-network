import Config from 'react-native-config';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
	webClientId: Config.GOOGLE_SIGNIN_CLIENT_ID,
});

export const handleSignInGoogle = async () => {
	const { idToken } = await GoogleSignin.signIn();

	if (!idToken) {
		throw new Error('Google Sign-In failed');
	}

	const googleCredential = auth.GoogleAuthProvider.credential(idToken);
	const { user } = await auth().signInWithCredential(googleCredential);
	return user;
};