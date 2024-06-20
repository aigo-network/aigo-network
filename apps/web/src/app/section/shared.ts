import { graphqlClient } from '@aigo/api/graphql';
import type { Web3FarmingQuest, Web3FarmingQuestType } from '@aigo/api/sdk';

import { showAppDownload } from '@/modals/ShowAppDownload';
import { appState } from '@/state/app';

const likeTwitter = () => {
	window.open(
		'https://x.com/AIGO_Network/status/1803645035797524930',
		'_blank',
	);
	appState.likeXCompleted = true;
};

const retweetTwitter = () => {
	window.open(
		'https://x.com/AIGO_Network/status/1803645035797524930',
		'_blank',
	);
	appState.reTweetCompleted = true;
};

const downloadApp = () => {
	showAppDownload();
	appState.downloadAppCompleted = true;
};

export type CompleteQuestFunction = (
	questId: string,
) => Promise<Web3FarmingQuest | null | undefined>;

const verifyQuest: CompleteQuestFunction = async (questId: string) => {
	try {
		const { web3FarmingVerifyQuestAndClaimPoints } =
			await graphqlClient.web3FarmingVerifyQuestAndClaimPoints({
				questId,
			});

		return web3FarmingVerifyQuestAndClaimPoints;
	} catch (error) {
		console.log(JSON.stringify(error, null, 2));
	}
};

export const questMetadataMap: Record<
	Web3FarmingQuestType,
	{
		description: string;
		hide?: boolean;
		action?: () => void;
		check?: CompleteQuestFunction;
	}
> = {
	LikeTwitterPost: {
		description: 'Like our Post on X',
		action: likeTwitter,
		check: verifyQuest,
	},
	RetweetTwitterPost: {
		description: 'Retweet our Post on X',
		action: retweetTwitter,
		check: verifyQuest,
	},
	DownloadApp: {
		description: 'Download AiGO on iOS or Android',
		action: downloadApp,
		check: verifyQuest,
	},
	ConnectEmail: {
		description: 'Connect with email',
		hide: true,
	},
};
