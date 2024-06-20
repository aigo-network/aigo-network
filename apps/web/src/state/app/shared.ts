import type { User as AppUser, Web3FarmingProfile } from '@aigo/api/sdk';
import { Web3FarmingQuestType } from '@aigo/api/sdk';
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
	web3FarmingProfile: {
		quests: [
			{ id: '1', type: Web3FarmingQuestType.DownloadApp },
			{ id: '2', type: Web3FarmingQuestType.LikeTwitterPost },
			{ id: '3', type: Web3FarmingQuestType.RetweetTwitterPost },
		],
	},
	isAuthLoading: true,
	likeXCompleted: false,
	followXCompleted: false,
	reTweetCompleted: false,
	downloadAppCompleted: false,
	verifyEmailCompleted: false,
});
