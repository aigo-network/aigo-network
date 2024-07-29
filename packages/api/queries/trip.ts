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

export const GetTripsQuery = gql`
	query getTrips($after: String = "", $first: Int = 10) {
		trips(after: $after, first: $first) {
			edges {
				node {
					id
					route
					status
					createdAt
					updatedAt
				}
				cursor
			}
			pageInfo {
				endCursor
				hasNextPage
			}
		}
	}
`;
