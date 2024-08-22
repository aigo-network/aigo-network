import { useEffect, useState } from 'react';
import type { RewardInstance } from '@aigo/api/graphql';
import { RewardStatus } from '@aigo/api/graphql';
import { rewardActions, rewardState } from 'state/reward';
import { getActiveRewards, getRedeemedRewards, getRewards } from 'utils/reward';
import { useSnapshot } from 'valtio';

export const useReward = () => {
	useEffect(() => {
		const handleGetRewards = async () => {
			const rewards = await getRewards();

			rewardActions.setRewards(rewards);
		};

		const handleGetActiveRewards = async () => {
			const activeRewards = await getActiveRewards();

			rewardActions.setActiveRewards(activeRewards);
		};

		const handleGetRedeemedRewards = async () => {
			const redeemedRewards = await getRedeemedRewards();

			rewardActions.setRedeemedReward(redeemedRewards);
		};

		handleGetRewards();
		handleGetActiveRewards();
		handleGetRedeemedRewards();
	}, []);
};

export const useRewardClassification = () => {
	const [activeRedeemedReward, setActiveRedeemedReward] = useState<
		RewardInstance[]
	>([]);
	const [nonActiveRedeemedReward, setNonActiveRedeemedReward] = useState<
		RewardInstance[]
	>([]);
	const { rewards, activeReward, redeemedRewards } = useSnapshot(rewardState);

	useEffect(() => {
		redeemedRewards?.forEach((reward) => {
			const rewardInfo = rewards?.[reward.infoId || ''];
			const isActive =
				rewardInfo?.status === RewardStatus.Live &&
				(rewardInfo.amount || 0) > 0 &&
				rewardInfo.expiredDate > Date.now() &&
				!reward.used;

			if (isActive) {
				activeRedeemedReward.push(reward);
				setActiveRedeemedReward(activeRedeemedReward);
			} else {
				nonActiveRedeemedReward.push(reward);
				setNonActiveRedeemedReward(nonActiveRedeemedReward);
			}
		});
	}, [redeemedRewards]);

	return { activeReward, activeRedeemedReward, nonActiveRedeemedReward };
};
