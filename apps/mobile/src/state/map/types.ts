import type { GeolocationResponse } from '@react-native-community/geolocation';

export type MapState = {
	currentLocation?: GeolocationResponse;
	currentTrip?: GeoJSON.LineString & {
		id: string;
		startedAt: Date;
	};
	mapReady?: boolean;
	permissionReady?: boolean;
	todaySummary: {
		distance: number; // in km
		time: number; // in h
		avgSpeed: number; // in km/h
	};
};
