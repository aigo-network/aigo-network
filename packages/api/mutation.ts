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
			phoneNumber
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

export const checkInMutation = gql`
	mutation checkIn {
		checkIn {
			date
			completed
		}
	}
`;

export const inputInvitationCodeMutation = gql`
	mutation inputInvitationCode($code: String) {
		inputInvitationCode(code: $code) {
			invitedBy
			invitedId
		}
	}
`;

export const deleteUserMutation = gql`
	mutation deleteUser {
		deleteUser {
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

export const web3FarmingInitProfile = gql`
	mutation web3FarmingInitProfile($referralCode: String) {
		web3FarmingInitProfile(referralCode: $referralCode) {
			id
			createdAt
			invitedBy
			quests {
				id
				type
				title
				description
				URL
				androidDownloadLink
				appleDownloadLink
				GOPoints
				completed
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

export const web3FarmingVerifyQuestAndClaimPoints = gql`
	mutation web3FarmingVerifyQuestAndClaimPoints($questId: String) {
		web3FarmingVerifyQuestAndClaimPoints(questId: $questId) {
			id
			type
			title
			description
			URL
			androidDownloadLink
			appleDownloadLink
			GOPoints
			completed
		}
	}
`;

export const web3FarmingRefreshReferrals = gql`
	mutation web3FarmingRefreshReferrals {
		web3FarmingRefreshReferrals {
			id
			code
			invitedDate
			invitedId
			invitedGOPoints
			referrerGOPoints
			createdAt
			updatedAt
		}
	}
`;
