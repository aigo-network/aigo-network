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
	query getTrips {
		trips {
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
