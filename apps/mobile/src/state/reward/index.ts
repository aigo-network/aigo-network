import type { RewardInfo, RewardInstance } from '@aigo/api/sdk';
import { proxy } from 'valtio';

interface RewardState {
	rewardsMap?: Record<string, RewardInfo>;
	activeRewards?: RewardInfo[];
	redeemedRewards?: RewardInstance[];
}

export const rewardState = proxy<RewardState>({});

export const rewardActions = {
	setRewards: (rewards: RewardInfo[]) => {
		rewards.forEach((reward) => {
			if (reward?.id) {
				rewardState.rewardsMap = Object.assign(rewardState.rewardsMap || {}, {
					[reward.id]: reward,
				});
			}
		});
	},
	setActiveRewards: (activeRewards: RewardInfo[]) => {
		rewardState.activeRewards = activeRewards;
	},
	setRedeemedReward: (redeemedRewards: RewardInstance[]) => {
		rewardState.redeemedRewards = redeemedRewards;
	},
	addNewRedeemedReward: (redeemedReward: RewardInstance) => {
		rewardState.redeemedRewards?.unshift(redeemedReward);
	},
	markRedeemedRewardUsed: (redeemedRewardId: string) => {
		const selectedReward = rewardState.redeemedRewards?.find(
			(reward) => reward.id === redeemedRewardId,
		);

		if (selectedReward) {
			selectedReward.used = true;
		}
	},
};
