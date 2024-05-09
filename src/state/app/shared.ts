import { proxy } from 'valtio';

interface AppState {
	counter: number;
}

export const appState = proxy<AppState>({
	counter: 0,
});
