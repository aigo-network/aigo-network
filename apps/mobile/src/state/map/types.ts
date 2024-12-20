import type { Trip, TripConnection } from '@aigo/api/sdk';
import type { GeolocationResponse } from '@react-native-community/geolocation';

export type MapState = {
	currentLocation?: GeolocationResponse;
	currentTrip?: GeoJSON.LineString & {
		id: string;
		startedAt: Date;
	};
	completedTrip?: Trip;
	startTripMetadata?: TripMetadata;
	mapReady?: boolean;
	permissionReady?: boolean;
	trips?: Trip[];
	lastTripConnection?: TripConnection;
};

export type PagingParams = {
	after: string;
	first: number;
};

export type TripMetadata = {
	userType: string;
	purpose: string;
};
