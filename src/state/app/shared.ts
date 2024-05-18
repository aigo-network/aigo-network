import type { User } from 'api/graphql';
import { proxy } from 'valtio';

import type { Onboarding } from './types';

interface AppState {
	appUser?: User;
	onboarding: Partial<Onboarding>;
}

export const initAppState = {
	onboarding: {},
};

export const appState = proxy<AppState>(initAppState);
