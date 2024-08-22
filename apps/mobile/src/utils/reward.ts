import type { RewardInfo, RewardInstance } from '@aigo/api/graphql';
import { graphqlClient, RewardQueryEnum } from '@aigo/api/graphql';

export const getRewards = async () => {
	const { rewards } = await graphqlClient.getRewards();
	const filteredReward: RewardInfo[] = rewards?.filter(
		(reward) => !!reward,
	) as never;

	return filteredReward;
};

export const getActiveRewards = async () => {
	const { rewards } = await graphqlClient.getActiveRewards({
		status: RewardQueryEnum.Active,
	});
	const filteredReward: RewardInfo[] = rewards?.filter(
		(reward) => !!reward,
	) as never;

	return filteredReward;
};

export const getRedeemedRewards = async () => {
	const { redeemedRewards } = await graphqlClient.getRedeemedRewards();
	const filteredReward: RewardInstance[] = redeemedRewards?.filter(
		(reward) => !!reward,
	) as never;

	return filteredReward;
};

export const redeemReward = async (rewardInfoId: string) => {
	const { redeemReward: newRedeemedReward } = await graphqlClient.redeemReward({
		rewardInfoId,
	});

	return newRedeemedReward;
};
