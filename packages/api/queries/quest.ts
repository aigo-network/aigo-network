import { gql } from 'graphql-request';

export const getUserWithWeb3FarmingProfile = gql`
	query getUserWithWeb3FarmingProfile {
		user {
			id
			name
			email
			city
			descriptions
			GOPoints
		}
		web3FarmingProfile {
			id
			createdAt
			invitedBy
			quests {
				id
				title
				description
				GOPoints
				type
				URL
				androidDownloadLink
				appleDownloadLink
				completed
				createdAt
			}
			countSuccessReferrals
			referralCodes {
				id
				code
				invitedId
				invitedDate
				invitedGOPoints
				referrerGOPoints
			}
		}
	}
`;

export const getWeb3FarmingProfile = gql`
	query getWeb3FarmingProfile {
		web3FarmingProfile {
			id
			createdAt
			invitedBy
			quests {
				id
				title
				description
				GOPoints
				type
				URL
				androidDownloadLink
				appleDownloadLink
				completed
				createdAt
			}
			countSuccessReferrals
			referralCodes {
				id
				code
				invitedId
				invitedDate
				invitedGOPoints
				referrerGOPoints
			}
		}
	}
`;
