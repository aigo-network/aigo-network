import { gql } from 'graphql-request';

export const rewardMutation = gql`
	mutation redeemReward($rewardInfoId: String!) {
		redeemReward(rewardInfoID: $rewardInfoId) {
			id
			infoId
			code
			link
			image
			used
		}
	}
	mutation markUsed($rewardInstanceId: String!) {
		markRewardAsUsed(rewardInstanceID: $rewardInstanceId)
	}
`;
