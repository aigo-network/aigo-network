import type { User } from 'api/graphql';

import { appState } from './shared';

export const appActions = {
	setAppUser: (user: User) => {
		appState.appUser = user;
	},
	setProfileName: (name: string) => {
		appState.profileName = name;
	},
	setUserDescription: (descriptionList: string[]) => {
		appState.userDescription = descriptionList;
	},
};

export { appState } from './shared';
