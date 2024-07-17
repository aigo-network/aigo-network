import type { GeolocationResponse } from '@react-native-community/geolocation';
import { proxy, useSnapshot } from 'valtio';

import type { MapState } from './types';

const initialMapState = {};

const mapState: MapState = proxy(initialMapState);

export const useMapState = (): MapState => {
	return useSnapshot(mapState) as MapState;
};

export const mapActions = {
	/**
	 * Update currentLocation and add new position to currentRoute.
	 * Async push to location to remote route via API
	 */
	setCurrentLocation: async (location: GeolocationResponse) => {
		mapState.currentLocation = location;

		if (mapState.currentRoute) {
			const { longitude, latitude } = location.coords;
			mapState.currentRoute.coordinates.push([longitude, latitude]);
		}
	},
	startNewRoute: async () => {
		const isCurrentRouteActive =
			!!mapState.remoteRouteMetadata &&
			mapState.remoteRouteMetadata.status === 'started';
		if (isCurrentRouteActive) {
			throw new MapError('need to end current route before starting new one');
		}

		if (!mapState.currentLocation?.coords) return;

		const { longitude, latitude } = mapState.currentLocation.coords;
		mapState.currentRoute = {
			type: 'LineString',
			// important: must initialize with two init points to prevent unknown breaking on Android
			coordinates: [
				[longitude, latitude],
				[longitude, latitude],
			],
		};
	},
	endCurrentRoute: async () => {
		const isCurrentRouteExisted = !!mapState.currentRoute;
		if (!isCurrentRouteExisted) {
			throw new MapError('current route not found, invalid end action');
		}

		mapState.currentRoute = undefined;
	},
};

export * from './types';
