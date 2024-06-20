import { graphqlClient } from '@aigo/api/graphql';
import { injectGetJWTFunc } from '@aigo/api/jwt';
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	GoogleAuthProvider,
	signInWithRedirect,
	TwitterAuthProvider,
} from 'firebase/auth';

import { appState } from '@/state/app';

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
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();
export const auth = getAuth();

export const signInWithGoogle = async () => {
	await signInWithRedirect(auth, googleProvider);
};

export const signInWithTwitter = async () => {
	await signInWithRedirect(auth, twitterProvider);
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
			appState.user = user;
		} catch (err) {
			console.log('auth error', err);
		}
	}
});
