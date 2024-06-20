import type { User as AppUser, Web3FarmingProfile } from '@aigo/api/sdk';
import { Web3FarmingQuestType } from '@aigo/api/sdk';
import { proxy } from 'valtio';

export type AuthUser = {
	uid: string;
	name: string;
	imageUrl: string;
};

export interface AppState {
	user?: AppUser;
	authUser?: AuthUser;
	web3FarmingProfile?: Web3FarmingProfile;
	isAuthLoading: boolean;
	likeXCompleted: boolean;
	followXCompleted: boolean;
	reTweetCompleted: boolean;
	downloadAppCompleted: boolean;
	verifyEmailCompleted: boolean;
}

export const initialState: AppState = {
	user: undefined,
	authUser: undefined,
	web3FarmingProfile: {
		quests: [
			{ id: '1', type: Web3FarmingQuestType.DownloadApp },
			{ id: '2', type: Web3FarmingQuestType.LikeTwitterPost },
			{ id: '3', type: Web3FarmingQuestType.RetweetTwitterPost },
		],
	},
	isAuthLoading: false,
	likeXCompleted: false,
	followXCompleted: false,
	reTweetCompleted: false,
	downloadAppCompleted: false,
	verifyEmailCompleted: false,
};

export const appState = proxy<AppState>(initialState);
