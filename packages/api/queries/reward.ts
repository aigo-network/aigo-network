import { gql } from 'graphql-request';

export const rewardsQuery = gql`
	query getRewards {
		rewards {
			id
			name
			description
			images
			amount
			points
			discount
			expiredDate
			type
			brand
			brandImage
			status
		}
	}
	query getActiveRewards($status: RewardQueryEnum) {
		rewards(status: $status) {
			id
			name
			description
			images
			amount
			points
			discount
			expiredDate
			type
			brand
			brandImage
			status
		}
	}
	query getRedeemedRewards {
		redeemedRewards {
			id
			infoId
			code
			link
			image
			used
		}
	}
`;
