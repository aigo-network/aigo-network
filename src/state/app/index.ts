import type { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { appState } from './shared';

export const appActions = {
	increaseCounter: (amount: number = 1) => (appState.counter += amount),
	setUser: (user: FirebaseAuthTypes.User) => {
		appState.user = user;
		appState.signedIn = !!user;
	},
	setProfileName: (name: string) => {
		appState.profileName = name;
	},
	setUserDescription: (descriptionList: string[]) => {
		appState.userDescription = descriptionList;
	},
};

export { appState } from './shared';
