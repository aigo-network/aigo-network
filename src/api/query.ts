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
			phoneNumber
			phoneNumberVerified
			phoneNumberVerifiedAt
			GOPoints
			completeOnboarding
		}
	}
`;
