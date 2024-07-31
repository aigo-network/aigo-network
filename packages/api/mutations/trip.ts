import { gql } from 'graphql-request';

export const StartTripMutation = gql`
	mutation startTrip($geolocation: GeolocationInput!, $metadata: TripMetaData) {
		startTrip(geolocation: $geolocation, tripMetadata: $metadata) {
			id
			route
			status
			createdAt
			updatedAt
		}
	}
`;

export const CompleteTripMutation = gql`
	mutation completeTrip($tripId: String!) {
		completeTrip(tripID: $tripId) {
			id
			route
			status
			startTime
			endTime
			userType
			GOPoints
			purpose
			createdAt
			updatedAt
		}
	}
`;

export const ClaimTripMutation = gql`
	mutation claimTrip($tripId: String!) {
		claimTrip(tripID: $tripId)
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
