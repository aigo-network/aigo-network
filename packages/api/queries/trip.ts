import { gql } from 'graphql-request';

export const GetTripQuery = gql`
	query getTrip($tripId: String!) {
		trip(tripID: $tripId) {
			id
			route
			status
			createdAt
			updatedAt
		}
	}
`;
