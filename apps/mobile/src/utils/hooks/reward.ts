import { useEffect, useMemo } from 'react';
import type { RewardInfo, RewardInstance } from '@aigo/api/graphql';
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
	const { rewardsMap, activeRewards, redeemedRewards } =
		useSnapshot(rewardState);

	const { activeRedeemedReward, nonActiveRedeemedReward } = useMemo(() => {
		const activeRedeemedReward: RewardInstance[] = [];
		const nonActiveRedeemedReward: RewardInstance[] = [];
		redeemedRewards?.forEach((reward) => {
			const rewardInfo = rewardsMap?.[reward.infoId || ''];
			const isExpired = new Date(rewardInfo?.expiredDate) < new Date();
			const isActive =
				rewardInfo?.status === RewardStatus.Live &&
				(rewardInfo.amount || 0) > 0 &&
				!isExpired &&
				!reward.used;

			if (isActive) {
				activeRedeemedReward.push(reward);
			} else {
				nonActiveRedeemedReward.push(reward);
			}
		});

		return { activeRedeemedReward, nonActiveRedeemedReward };
	}, [redeemedRewards]);

	return {
		activeRewards,
		activeRedeemedReward,
		nonActiveRedeemedReward,
	};
};

export const useRewardDetail = ({
	rewardInfoId,
	redeemedRewardId = '',
}: {
	rewardInfoId: string;
	redeemedRewardId?: string;
}) => {
	const { rewardsMap, redeemedRewards } = useSnapshot(rewardState);
	const rewardDetail: { rewardInfo?: RewardInfo; reward?: RewardInstance } = {
		rewardInfo: {},
		reward: {},
	};
	const reward = rewardsMap?.[rewardInfoId];
	rewardDetail.rewardInfo = reward as never;

	if (redeemedRewardId) {
		const reward = redeemedRewards?.find(
			(reward) => reward.id === redeemedRewardId,
		);

		rewardDetail.reward = reward;
	}

	return rewardDetail;
};
