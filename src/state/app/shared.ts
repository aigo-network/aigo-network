import type { User } from 'api/graphql';
import { proxy } from 'valtio';

interface AppState {
	appUser?: User;
	profileName: string;
	userDescription: string[];
}

export const appState = proxy<AppState>({
	profileName: '',
	userDescription: [],
});
