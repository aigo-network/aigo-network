import type { User as AppUser, Web3FarmingProfile } from '@aigo/api/sdk';
import type { User as FirebaseUser } from '@firebase/auth';
import { proxy } from 'valtio';

export interface AppState {
	user?: AppUser;
	firebaseUser?: FirebaseUser;
	web3FarmingProfile?: Web3FarmingProfile;
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
	web3FarmingProfile: undefined,
	isAuthLoading: true,
	likeXCompleted: false,
	followXCompleted: false,
	reTweetCompleted: false,
	downloadAppCompleted: false,
	verifyEmailCompleted: false,
});
