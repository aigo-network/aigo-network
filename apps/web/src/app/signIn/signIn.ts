import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

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
	await signInWithPopup(auth, provider);
};

export const signOut = async () => {
	await auth.signOut();
};

auth.onIdTokenChanged((firebaseUser) => {
	console.log(firebaseUser);
});
