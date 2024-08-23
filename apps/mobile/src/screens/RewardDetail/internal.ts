import { graphqlClient } from '@aigo/api/graphql';
import {
	showConfirmRedemption,
	showFailRedemption,
	showMarkAsUsed,
	showSuccessRedemption,
} from 'modals/RewardModals';
import { rewardActions } from 'state/reward';
import { navigationRef } from 'utils/navigation';
import { redeemReward } from 'utils/reward';

const handleRedeemReward = async (rewardInfoId: string, rewardName: string) => {
	const newRedeemedReward = await redeemReward(rewardInfoId);

	if (newRedeemedReward) {
		rewardActions.addNewRedeemedReward(newRedeemedReward);
		const { id: rewardId } = newRedeemedReward;
		showSuccessRedemption({
			rewardName,
			onConfirm: () =>
				navigationRef.navigate('RewardDetail', {
					redeemed: true,
					rewardInfoId,
					rewardId,
				}),
			onCancel: () =>
				navigationRef.navigate('BottomTab', {
					screen: 'Reward',
				}),
		});
	} else {
		showFailRedemption({
			onCancel: () =>
				navigationRef.navigate('BottomTab', {
					screen: 'Reward',
				}),
		});
	}
};

export const handleRedeemPress = (
	rewardInfoId: string,
	rewardName: string,
	points: number,
	onComplete: () => void,
) => {
	showConfirmRedemption({
		rewardName,
		points,
		onConfirm: async () => {
			await handleRedeemReward(rewardInfoId, rewardName);
			onComplete();
		},
		onCancel: onComplete,
	});
};

const handleMarkUsed = async (rewardInstanceId: string) => {
	// const { markRewardAsUsed } = await graphqlClient.markUsed({
	// 	rewardInstanceId,
	// });
	const markRewardAsUsed = true;

	if (markRewardAsUsed) {
		rewardActions.markRedeemedRewardUsed(rewardInstanceId);
	}
};

export const handleMarkUsedPress = (
	rewardInstanceId: string,
	onComplete: () => void,
) => {
	showMarkAsUsed({
		onConfirm: async () => {
			await handleMarkUsed(rewardInstanceId);
			onComplete();
		},
		onCancel: onComplete,
	});
};
