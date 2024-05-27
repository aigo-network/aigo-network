import type { User } from 'api/graphql';
import { type Content, translations } from 'utils/translations';
import { proxy } from 'valtio';

import type { Onboarding } from './types';

interface AppState {
	appUser?: User;
	onboarding: Partial<Onboarding>;
	content: Content;
}

export const initAppState: AppState = {
	onboarding: {},
	content: translations.en,
};

export const appState = proxy<AppState>(initAppState);
