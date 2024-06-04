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
			GOPoints
			dailyMissions {
				checkIn {
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
