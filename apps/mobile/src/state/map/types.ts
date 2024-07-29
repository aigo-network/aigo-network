import type { Trip } from '@aigo/api/sdk';
import type { GeolocationResponse } from '@react-native-community/geolocation';

export type TodaySummary = {
	distance: number; // in km
	time: number; // in h
	avgSpeed: number; // in km/h
};

export type MapState = {
	currentLocation?: GeolocationResponse;
	currentTrip?: GeoJSON.LineString & {
		id: string;
		startedAt: Date;
	};
	mapReady?: boolean;
	permissionReady?: boolean;
	todaySummary: TodaySummary;
	trips?: Trip[];
};
