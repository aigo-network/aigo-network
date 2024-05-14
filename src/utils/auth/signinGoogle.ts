import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

GoogleSignin.configure({
    webClientId: Config.GOOGLE_SIGNIN_CLIENT_ID,
});

export const handleSignInGoogle = async () => {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const { user } = await auth().signInWithCredential(googleCredential);
    return user;
}
