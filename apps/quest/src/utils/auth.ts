import { graphqlClient } from '@aigo/api/graphql';
import { HeaderPrefixEnum, injectGetJWTFunc } from '@aigo/api/jwt';
import { config } from '@aigo/config';
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	TwitterAuthProvider,
} from 'firebase/auth';

import { showImportCode } from '@/modals/ShowImportCode';
import { appActions, appState } from '@/state/app';

const firebaseConfig = {
	appId: FIREBASE_APP_ID,
	apiKey: FIREBASE_API_KEY,
	projectId: FIREBASE_PROJECT_ID,
	authDomain: FIREBASE_AUTH_DOMAIN,
	storageBucket: FIREBASE_STORAGE_BUCKET,
	measurementId: FIREBASE_MEASUREMENT_ID,
	messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
};

export const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();
export const auth = getAuth();

appState.isAuthLoading = true;

export const signInWithGoogle = async () => {
	appState.isAuthLoading = true;
	await signInWithPopup(auth, googleProvider);
	appState.isAuthLoading = false;
};

export const signInWithTwitter = async () => {
	appState.isAuthLoading = true;
	await signInWithPopup(auth, twitterProvider);
	appState.isAuthLoading = false;
};

export const logOut = async () => {
	await auth.signOut();
	appActions.reset();
};

injectGetJWTFunc(async () => {
	const jwt = await auth.currentUser?.getIdToken();
	return {
		jwt,
		headerPrefix: HeaderPrefixEnum.BEARER,
	};
});

auth.onIdTokenChanged(async (authUser) => {
	if (authUser) {
		console.log(JSON.stringify(authUser, null, 2));
		try {
			appState.authUser = {
				uid: authUser.uid,
				name: authUser.displayName || authUser.email || 'Unknown',
				imageUrl: authUser.photoURL || '',
			};
			handleAfterSignInSucceed();
		} catch (err) {
			console.log('auth error', err);
		}
	}

	appState.isAuthLoading = false;
});

export type TelegramUserData = {
	id: number;
	first_name: string;
	last_name: string;
	photo_url: string;
	username: string;
	auth_date: number;
	hash: string;
};

export const signInWithTelegram = async () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(window as any).Telegram.Login.auth(
		{
			bot_id: config.TELEGRAM_BOT_ID,
			request_access: true,
		},
		async (data: TelegramUserData) => {
			try {
				if (data) {
					createAndInjectTelegramToken(data);
					appState.authUser = {
						imageUrl: data.photo_url || '',
						name: data.first_name || data.username || 'Unknown',
						uid: String(data.id),
					};
					handleAfterSignInSucceed();
				} else {
					console.log('unable to sign in');
				}
			} catch (err) {
				console.log('auth error', err);
			}
		},
	);
};

export const createAndInjectTelegramToken = (data: TelegramUserData) => {
	const jsonString = JSON.stringify(data);

	let hexEncoded = '';
	for (let i = 0; i < jsonString.length; i++) {
		hexEncoded += jsonString.charCodeAt(i).toString(16).padStart(2, '0');
	}

	injectGetJWTFunc(async () => {
		return {
			jwt: hexEncoded,
			headerPrefix: HeaderPrefixEnum.TELE_HASH,
		};
	});
};

const handleAfterSignInSucceed = async () => {
	try {
		const { user } = await graphqlClient.getUserProfile();
		appState.user = user as never;

		const { web3FarmingProfile } = await graphqlClient.getWeb3FarmingProfile();
		if (web3FarmingProfile?.id) {
			appState.web3FarmingProfile = web3FarmingProfile;
		} else {
			showImportCode();
		}
	} catch (err) {
		console.log('Failed to handle after sign-in', err);
	}
};
