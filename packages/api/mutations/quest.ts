import { gql } from 'graphql-request';

export const web3FarmingInitProfile = gql`
	mutation web3FarmingInitProfile($referralCode: String) {
		web3FarmingInitProfile(referralCode: $referralCode) {
			id
			createdAt
			invitedBy
			quests {
				id
				type
				title
				description
				URL
				androidDownloadLink
				appleDownloadLink
				GOPoints
				completed
			}
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

export const web3FarmingVerifyQuestAndClaimPoints = gql`
	mutation web3FarmingVerifyQuestAndClaimPoints($questId: String) {
		web3FarmingVerifyQuestAndClaimPoints(questId: $questId) {
			id
			type
			title
			description
			URL
			androidDownloadLink
			appleDownloadLink
			GOPoints
			completed
		}
	}
`;

export const web3FarmingRefreshReferrals = gql`
	mutation web3FarmingRefreshReferrals {
		web3FarmingRefreshReferrals {
			id
			code
			invitedDate
			invitedId
			invitedGOPoints
			referrerGOPoints
			createdAt
			updatedAt
		}
	}
`;
