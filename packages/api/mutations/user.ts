import { gql } from 'graphql-request';

export const updateProfile = gql`
	mutation updateProfile($profile: UserProfile) {
		updateProfile(profile: $profile) {
			id
			wallet
			name
			email
			descriptions
			city
			imageUrl
			phoneNumber
		}
	}
`;

export const deleteUserMutation = gql`
	mutation deleteUser {
		deleteUser {
			id
			wallet
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

export const verifyPhoneNumber = gql`
	mutation verifyPhoneNumber {
		verifyPhoneNumber
	}
`;

export const verifyNyamNyamUser = gql`
	mutation verifyNyamNyamUser($nnid: String) {
		verifyNyamNyamUser(NNID: $nnid) {
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
