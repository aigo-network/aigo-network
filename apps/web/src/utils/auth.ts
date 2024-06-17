import { graphqlClient } from '@aigo/api/graphql';
import { injectGetJWTFunc } from '@aigo/api/jwt';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';

const firebaseConfig = {
	appId: FIREBASE_APP_ID,
	apiKey: FIREBASE_API_KEY,
	projectId: FIREBASE_PROJECT_ID,
	authDomain: FIREBASE_AUTH_DOMAIN,
	storageBucket: FIREBASE_STORAGE_BUCKET,
	measurementId: FIREBASE_MEASUREMENT_ID,
	messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
};

initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
export const auth = getAuth();

export const signInWithGoogle = async () => {
	await signInWithRedirect(auth, provider);
};

export const logOut = async () => {
	await auth.signOut();
};

injectGetJWTFunc(async () => {
	return auth.currentUser?.getIdToken();
});

auth.onIdTokenChanged(async (authUser) => {
	console.log('auth user', authUser);
	if (authUser) {
		try {
			const { user } = await graphqlClient.getUserProfile();
			console.log('user', user);
		} catch (err) {
			console.log('auth error', err);
		}
	}
});
