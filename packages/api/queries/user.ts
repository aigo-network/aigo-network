import { gql } from 'graphql-request';

export const userWithDailyMissionsQuery = gql`
	query getUserWitDailyMissions {
		user {
			...ProfilePart
			...NyamNyamProfilePart
			...DailyMissionPart
		}
	}
`;

export const userProfileQuery = gql`
	query getUserProfile {
		user {
			...ProfilePart
			...NyamNyamProfilePart
		}
	}
`;

export const UserProfileFragment = gql`
	fragment ProfilePart on User {
		id
		name
		email
		city
		imageUrl
		descriptions
		invitationCode
		GOPoints

		completeOnboarding

		phoneNumber
		phoneNumberVerified
		phoneNumberVerifiedAt

		createdAt
		updatedAt
	}
`;

export const NyamNyamProfileFragment = gql`
	fragment NyamNyamProfilePart on User {
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
	}
`;

export const UserDailyMissionFragment = gql`
	fragment DailyMissionPart on User {
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
	}
`;
