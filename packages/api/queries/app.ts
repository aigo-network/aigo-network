import { gql } from 'graphql-request';

export const GOPointQuery = gql`
	query getUserGOPoints {
		user {
			GOPoints
		}
	}
`;
