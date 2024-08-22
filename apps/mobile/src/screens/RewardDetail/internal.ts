import {
	showConfirmRedemption,
	showFailRedemption,
	showSuccessRedemption,
} from 'modals/RewardModals';
import { rewardActions } from 'state/reward';
import { navigationRef } from 'utils/navigation';
import { redeemReward } from 'utils/reward';

export const handleRedeemReward = async (
	rewardInfoId: string,
	rewardName: string,
) => {
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
