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

export const web3FarmingProfile = gql`
	query web3FarmingProfile {
		web3FarmingProfile {
			id
			createdAt
			invitedBy
			quests {
				id
				GOPoints
				completed
				type
			}
			referralCodes {
				id
				GOPoints
				code
				invitedId
				invitedDate
			}
		}
	}
`;
