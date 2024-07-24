import { gql } from 'graphql-request';

export const StartTripMutation = gql`
	mutation startTrip($geolocation: GeolocationInput!) {
		startTrip(geolocation: $geolocation) {
			id
			route
			status
			createdAt
			updatedAt
		}
	}
`;

export const InsertTripPointMutation = gql`
	mutation insertTripPoint($tripId: String!, $geolocation: GeolocationInput!) {
		insertTripPoint(tripID: $tripId, geolocation: $geolocation) {
			id
			route
			status
			createdAt
			updatedAt
		}
	}
`;

export const InsertBatchTripPointsMutation = gql`
	mutation insertBatchTripPoints(
		$tripId: String!
		$geolocations: [GeolocationInput!]!
	) {
		insertBatchTripPoints(tripID: $tripId, geolocations: $geolocations) {
			id
			route
			status
			createdAt
			updatedAt
		}
	}
`;
