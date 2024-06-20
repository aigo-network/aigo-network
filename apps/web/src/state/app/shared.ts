import type { User } from '@aigo/api/sdk';
import { proxy } from 'valtio';

export interface AppState {
	user?: User;
	likeXCompleted: boolean;
	followXCompleted: boolean;
	reTweetCompleted: boolean;
	downloadAppCompleted: boolean;
	verifyEmailCompleted: boolean;
}

export const appState = proxy<AppState>({
	user: undefined,
	likeXCompleted: false,
	followXCompleted: false,
	reTweetCompleted: false,
	downloadAppCompleted: false,
	verifyEmailCompleted: false,
});
