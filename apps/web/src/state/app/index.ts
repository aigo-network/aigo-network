import { graphqlClient } from '@aigo/api/graphql';
import { Web3FarmingQuestType } from '@aigo/api/sdk';

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

const getStateByQuestType = (type?: Web3FarmingQuestType) => {
	switch (type) {
		case Web3FarmingQuestType.LikeTwitterPost: {
			return appState.likeXCompleted;
		}
		case Web3FarmingQuestType.RetweetTwitterPost: {
			return appState.reTweetCompleted;
		}
		case Web3FarmingQuestType.DownloadApp: {
			return appState.downloadAppCompleted;
		}
		default: {
			return false;
		}
	}
};

export const appActions = {
	queryAndUpdateGOPoints,
	getStateByQuestType,
};

export * from './shared';
