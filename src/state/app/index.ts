import { appState } from './shared';

export const appActions = {
	increaseCounter: (amount: number = 1) => appState.counter += amount,
};

export { appState } from './shared';
