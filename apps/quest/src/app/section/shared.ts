import type { FC } from 'react';
import type { ColorValue } from 'react-native';
import { Linking } from 'react-native';
import { graphqlClient } from '@aigo/api/graphql';
import type { Web3FarmingQuest } from '@aigo/api/sdk';
import { Web3FarmingQuestType } from '@aigo/api/sdk';
import AigoLogo from '@aigo/components/icon/AigoLogo';
import Discord from '@aigo/components/icon/Discord';
import Telegram from '@aigo/components/icon/Telegram';
import Twitter from '@aigo/components/icon/Twitter';

import { showInformation } from '@/modals/Information';
// import { showAppDownload } from '@/modals/ShowAppDownload';

const likeTwitter = () => {
	window.open(
		'https://x.com/AIGO_Network/status/1803367451469685146',
		'_blank',
	);
	// appState.likeXCompleted = true;
};

const retweetTwitter = () => {
	window.open(
		'https://x.com/intent/retweet?tweet_id=1793333095456035257',
		'_blank',
	);
	// appState.reTweetCompleted = true;
};

const downloadApp = () => {
	// showAppDownload();
	// appState.downloadAppCompleted = true;
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
	string,
	{
		order: number;
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
		order: 2,
	},
	RetweetTwitterPost: {
		description: 'Retweet our Post on X',
		action: retweetTwitter,
		check: verifyQuest,
		order: 3,
	},
	DownloadApp: {
		description: 'Download AiGO on iOS or Android',
		action: downloadApp,
		order: 1,
		// check: verifyQuest,
		check: (() => {
			showInformation(
				'Verify download AiGO',
				'Nice! You are now an AiGO member, your quest is verifying and your points will be distribute when it’s complete!',
			);
		}) as never,
	},
};

export const getQuestOrder = (quest: Web3FarmingQuest) => {
	if (!quest.type) return -1;
	return questMetadataMap[quest.type].order;
};

interface VisualProps {
	width?: number;
	color?: ColorValue;
	fillColor?: ColorValue;
}

export const getIcon: (type?: Web3FarmingQuestType | null) => {
	Component: FC<VisualProps>;
	props: VisualProps;
} = (type) => {
	switch (type) {
		case Web3FarmingQuestType.LikeTwitterPost:
		case Web3FarmingQuestType.RetweetTwitterPost:
		case Web3FarmingQuestType.FollowTwitter:
			return { Component: Twitter, props: { width: 30, color: '#ffffff' } };
		case Web3FarmingQuestType.JoinDiscord:
			return { Component: Discord, props: { width: 30 } };
		case Web3FarmingQuestType.JoinTelegram:
			return { Component: Telegram, props: { width: 30, color: '#ffffff' } };
		default:
			return { Component: AigoLogo, props: { width: 30, color: '#ffffff' } };
	}
};

export const getAction: (
	quest?: Web3FarmingQuest | null,
) => (() => void) | undefined = (quest) => {
	switch (quest?.type) {
		case Web3FarmingQuestType.LikeTwitterPost:
		case Web3FarmingQuestType.RetweetTwitterPost:
		case Web3FarmingQuestType.FollowTwitter:
		case Web3FarmingQuestType.JoinTelegram:
		case Web3FarmingQuestType.JoinDiscord:
			return () => window.open(quest?.URL || '');
		case Web3FarmingQuestType.DownloadApp:
			// return () => showAppDownload();
			return () => Linking.openURL('https://ride.aigo.network');
		default:
			return;
	}
};
