import { gql } from 'graphql-request';

export const userQuery = gql`
	query user {
		user {
			id
			name
			email
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

export const userCompleteOnboardingQuery = gql`
	query completeOnboarding {
		user {
			id
			name
			email
			city
			descriptions
			GOPoints
			completeOnboarding
		}
	}
`;

export const dailyMissionQuery = gql`
	query dailyMissions {
		user {
			id
			dailyMissions {
				checkIn {
					date
					completed
				}
			}
		}
	}
`;
