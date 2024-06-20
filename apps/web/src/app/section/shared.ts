import type { Web3FarmingQuestType } from '@aigo/api/sdk';

import { showAppDownload } from '@/modals/ShowAppDownload';

export const questMetadataMap: Record<
	Web3FarmingQuestType,
	{
		description: string;
		hide?: boolean;
		action?: () => void;
	}
> = {
	LikeTwitterPost: {
		description: 'Like our Post on X',
	},
	RetweetTwitterPost: {
		description: 'Retweet our Post on X',
	},
	DownloadApp: {
		description: 'Download AiGO on iOS or Android',
		action: showAppDownload,
	},
	ConnectEmail: {
		description: 'Connect with email',
		hide: true,
	},
};
