import { gql } from 'graphql-request';

export const userQuery = gql`
	query getUser {
		user {
			id
			name
			email
			phoneNumber
			phoneNumberVerified
			phoneNumberVerifiedAt
			imageUrl
			city
			descriptions
			NyamNyamUserProfile {
				NNID
				createdAt
				extKey
				id
				name
				nick
				registrationNumber
				updatedAt
				verifiedAt
			}
			GOPoints
			dailyMissions {
				checkIn {
					date
					completed
				}
				latest7DaysCheckIn {
					date
					completed
				}
			}
			invitationCode
			createdAt
			updatedAt
		}
	}
`;

export const GOPointQuery = gql`
	query getUserGOPoints {
		user {
			GOPoints
		}
	}
`;

export const userProfileQuery = gql`
	query getUserProfile {
		user {
			id
			name
			email
			city
			descriptions
			NyamNyamUserProfile {
				NNID
				createdAt
				extKey
				id
				name
				nick
				registrationNumber
				updatedAt
				verifiedAt
			}
			phoneNumber
			phoneNumberVerified
			phoneNumberVerifiedAt
			GOPoints
			completeOnboarding
		}
	}
`;

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
