import { gql } from 'graphql-request';

export const userQuery = gql`
	query user {
		user {
			GOPoints
			city
			createdAt
			dailyMissions {
				checkIn {
					date
					completed
				}
			}
			deletedAt
			descriptions
			email
			id
			imageUrl
			invitationCode
			invitedBy
			name
			updatedAt
		}
	}
`;

export const userCompleteOnboardingQuery = gql`
	query completeOnboarding {
		user {
			name
			email
			city
			descriptions
			completeOnboarding
		}
	}
`;

export const dailyMissionQuery = gql`
	query dailyMissions {
		user {
			dailyMissions {
				checkIn {
					date
					completed
				}
			}
		}
	}
`;
