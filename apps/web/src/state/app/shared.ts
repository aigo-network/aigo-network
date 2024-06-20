import type { User as AppUser } from '@aigo/api/sdk';
import type { User as FirebaseUser } from '@firebase/auth';
import { proxy } from 'valtio';

export interface AppState {
	user?: AppUser;
	firebaseUser?: FirebaseUser;
	isAuthLoading: boolean;
	likeXCompleted: boolean;
	followXCompleted: boolean;
	reTweetCompleted: boolean;
	downloadAppCompleted: boolean;
	verifyEmailCompleted: boolean;
}

export const appState = proxy<AppState>({
	user: undefined,
	firebaseUser: undefined,
	isAuthLoading: true,
	likeXCompleted: false,
	followXCompleted: false,
	reTweetCompleted: false,
	downloadAppCompleted: false,
	verifyEmailCompleted: false,
});
