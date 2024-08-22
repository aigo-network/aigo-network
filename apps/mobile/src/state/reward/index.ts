import type { RewardInfo, RewardInstance } from '@aigo/api/sdk';
import { proxy } from 'valtio';

// import type { RewardInfo } from './types';

interface RewardState {
	rewards?: Record<string, RewardInfo>;
	activeReward?: RewardInfo[];
	redeemedRewards?: RewardInstance[];
}

export const rewardState = proxy<RewardState>({});

export const rewardActions = {
	setRewards: (rewards: RewardInfo[]) => {
		rewards.forEach((reward) => {
			if (reward?.id) {
				rewardState.rewards = Object.assign(rewardState.rewards || {}, {
					[reward.id]: reward,
				});
			}
		});
	},
	setActiveRewards: (activeRewards: RewardInfo[]) => {
		rewardState.activeReward = activeRewards;
	},
	setRedeemedReward: (redeemedRewards: RewardInstance[]) => {
		rewardState.redeemedRewards = redeemedRewards;
	},
};
