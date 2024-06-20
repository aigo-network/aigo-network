import { graphqlClient } from '@aigo/api/graphql';

import { appState } from './shared';

const queryAndUpdateGOPoints = async () => {
	try {
		const { user } = await graphqlClient.getUserGOPoints();
		const GOPoints = user?.GOPoints;
		if (GOPoints !== 0 && !GOPoints) {
			console.log('null GO Points');
			return;
		}

		if (appState.user) appState.user.GOPoints = GOPoints;
	} catch (error) {
		console.log('can not query GO Points', error);
	}
};

export const appActions = {
	queryAndUpdateGOPoints,
};

export * from './shared';
