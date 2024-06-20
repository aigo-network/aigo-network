import { graphqlClient } from '@aigo/api/graphql';
import { Web3FarmingQuestType } from '@aigo/api/sdk';

import type { AppState } from './shared';
import { appState, initialState } from './shared';

const reset = () => {
	for (const key in initialState) {
		const k = key as keyof AppState;
		appState[k] = initialState[k as never] as never;
	}
};

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
	reset,
	queryAndUpdateGOPoints,
	getStateByQuestType,
};

export * from './shared';
