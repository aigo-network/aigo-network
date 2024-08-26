import { graphqlClient } from '@aigo/api/graphql';
import { showMarkAsUsed } from 'modals/RewardModals';
import { rewardActions } from 'state/reward';

const handleMarkUsed = async (rewardInstanceId: string) => {
	const { markRewardAsUsed } = await graphqlClient.markUsed({
		rewardInstanceId,
	});

	if (markRewardAsUsed) {
		rewardActions.markRedeemedRewardUsed(rewardInstanceId);
	}
};

export const handleMarkUsedPress = (rewardInstanceId: string) => {
	showMarkAsUsed({
		onConfirm: async () => {
			await handleMarkUsed(rewardInstanceId);
		},
	});
};
