import { graphqlClient } from '@aigo/api/graphql';
import { injectGetJWTFunc } from '@aigo/api/jwt';
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	GoogleAuthProvider,
	signInWithRedirect,
	TwitterAuthProvider,
} from 'firebase/auth';

import { showImportCode } from '@/modals/ShowImportCode';
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
	appState.isAuthLoading = true;
	await signInWithRedirect(auth, twitterProvider);
	appState.isAuthLoading = false;
};

export const logOut = async () => {
	await auth.signOut();
};

injectGetJWTFunc(async () => {
	return auth.currentUser?.getIdToken();
});

auth.onIdTokenChanged(async (authUser) => {
	if (authUser) {
		try {
			const { user } = await graphqlClient.getUserProfile();
			appState.firebaseUser = authUser;
			appState.user = user as never;
			const { web3FarmingProfile } =
				await graphqlClient.getWeb3FarmingProfile();
			if (web3FarmingProfile?.id) {
				appState.web3FarmingProfile = web3FarmingProfile;
			} else {
				showImportCode();
			}
		} catch (err) {
			console.log('auth error', err);
		}
	}

	appState.isAuthLoading = false;
});

global.logOut = logOut;
