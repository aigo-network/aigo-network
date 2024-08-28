import type { RewardInfo, RewardInstance } from '@aigo/api/graphql';
import { graphqlClient, RewardQueryEnum } from '@aigo/api/graphql';

export enum RewardStatus {
	ACTIVE = 'Active',
	USED = 'Used',
	EXPIRED = 'Expired',
}

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

export const redeemReward = async (
	rewardInfoId: string,
): Promise<{ newRedeemedReward: RewardInstance; limitReach: boolean }> => {
	const result = { newRedeemedReward: {}, limitReach: false };

	try {
		const { redeemReward } = await graphqlClient.redeemReward({
			rewardInfoId,
		});
		result.newRedeemedReward = Object.assign({}, redeemReward);
		return result;
	} catch (error) {
		const errorString = JSON.stringify(error, null, 2);
		const isLimitReached = errorString.indexOf('reach max redemption limit');
		if (isLimitReached) {
			result.limitReach = isLimitReached !== -1;
		}
		return result;
	}
};

export const calculatePoints = (points: number, discount: number) => {
	return points * (1 - discount / 100);
};
