import { gql } from 'graphql-request';

export const queryUserFullProfile = gql`
	query userFullProfile {
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
