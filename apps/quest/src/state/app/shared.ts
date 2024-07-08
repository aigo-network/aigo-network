import {
	type User as AppUser,
	type Web3FarmingProfile,
	Web3FarmingQuestType,
} from '@aigo/api/sdk';
import { proxy } from 'valtio';

import packageJson from '../../../package.json';

export type AuthUser = {
	uid: string;
	name: string;
	imageUrl: string;
};

export interface AppState {
	version: string;
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
	version: packageJson.version,
	user: undefined,
	authUser: undefined,
	web3FarmingProfile: {
		referralCodes: [
			{
				id: 'mock-01',
				code: 'AiGO-F2XLSF',
				invitedGOPoints: 100,
				referrerGOPoints: 100,
			},
			{
				id: 'mock-01',
				code: 'AiGO-FKG8NL',
				invitedGOPoints: 100,
				referrerGOPoints: 100,
				invitedId: 'mock-id',
			},
		],
		quests: [
			{
				id: 'mock-01',
				type: Web3FarmingQuestType.DownloadApp,
				title: 'Download AiGO App',
				GOPoints: 600,
			},
			{
				id: 'mock-02',
				type: Web3FarmingQuestType.RetweetTwitterPost,
				title: 'Retweet',
				GOPoints: 60,
				completed: true,
			},
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
