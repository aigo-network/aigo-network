import { gql } from 'graphql-request';

export const updateProfile = gql`
	mutation updateProfile($profile: UserProfile) {
		updateProfile(profile: $profile) {
			id
			name
			email
			descriptions
			city
			imageUrl
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
