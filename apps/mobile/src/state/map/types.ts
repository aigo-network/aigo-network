import type { GeolocationResponse } from '@react-native-community/geolocation';

export type MapState = {
	currentLocation?: GeolocationResponse;
	currentRoute?: GeoJSON.LineString;
	remoteRouteMetadata?: {
		routeId: string;
		status: 'started' | 'ended';
	};
};
