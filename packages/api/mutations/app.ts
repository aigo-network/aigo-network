import { gql } from 'graphql-request';

export const checkInMutation = gql`
	mutation checkIn {
		checkIn {
			date
			completed
		}
	}
`;

export const completeOnboardingMutation = gql`
	mutation completeOnboarding {
		completeOnboarding {
			id
			name
			email
			imageUrl
			city
			descriptions
			phoneNumber
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
