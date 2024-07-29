import { graphqlClient } from '@aigo/api/graphql';
import type { Trip } from '@aigo/api/sdk';
import type { GeolocationResponse } from '@react-native-community/geolocation';
import crashlytics from '@react-native-firebase/crashlytics';
import pThrottle from 'p-throttle';
import { proxy, useSnapshot } from 'valtio';

import type { MapState } from './types';

const initialMapState: MapState = {
	todaySummary: {
		distance: 0,
		time: 0,
		avgSpeed: 0,
	},
};

const mapState: MapState = proxy(initialMapState);

export const useMapState = (): MapState => {
	return useSnapshot(mapState) as MapState;
};

export const getMapState = () => {
	// clone state to prevent unexpected mutation
	return { ...mapState };
};

const throttle = pThrottle({
	limit: 4,
	interval: 1000,
});

export const mapActions = {
	setMapReady(state: boolean) {
		mapState.mapReady = state;
	},
	setPermissionReady(state: boolean) {
		mapState.permissionReady = state;
	},
	setTrips(trips: Trip[]) {
		mapState.trips = trips;
	},
	throttledSetCurrentLocation: throttle(
		async (location: GeolocationResponse) => {
			try {
				mapState.currentLocation = location;

				if (!mapState.currentTrip) return;

				const { coords, timestamp } = location;

				await graphqlClient.insertTripPoint({
					tripId: mapState.currentTrip.id,
					geolocation: { ...coords, timestamp: new Date(timestamp) },
				});

				const { longitude, latitude } = coords;

				mapState.currentTrip.coordinates.push([longitude, latitude]);
			} catch (error) {
				crashlytics().recordError(error as Error, 'insertTripPoint');
				console.debug('Failed to insert trip point:', error);
			}
		},
	),
	startNewTrip: async () => {
		try {
			const isCurrentRouteActive = !!mapState.currentTrip;
			if (isCurrentRouteActive) {
				throw new MapError('Need to complete current trip to start new trip');
			} else if (!mapState.currentLocation) {
				throw new MapError(
					'Can not retrieve current location to start new trip',
				);
			}

			const { coords, timestamp } = mapState.currentLocation;

			const { startTrip: trip } = await graphqlClient.startTrip({
				geolocation: { ...coords, timestamp: new Date(timestamp) },
			});

			if (!trip || !trip.id) {
				throw new MapError('Invalid trip response, no trip found');
			}

			const { latitude, longitude } = coords;

			mapState.currentTrip = {
				id: trip.id,
				startedAt: trip.createdAt ? new Date(trip.createdAt) : new Date(),
				type: 'LineString',
				// important: must initialize with two init points to prevent unknown breaking on Android
				coordinates: [
					[longitude, latitude],
					[longitude, latitude],
				],
			};
		} catch (error) {
			crashlytics().recordError(error as Error, 'startTrip');
			console.debug('Failed to start trip:', error);
		}
	},
	endCurrentTrip: async () => {
		try {
			if (!mapState.currentTrip) {
				throw new MapError('current trip not found, invalid end action');
			}

			const { completeTrip: success } = await graphqlClient.completeTrip({
				tripId: mapState.currentTrip.id,
			});

			if (!success) {
				throw new MapError('Complete trip return false');
			}

			mapState.currentTrip = undefined;
		} catch (error) {
			crashlytics().recordError(error as Error, 'completeTrip');
			console.debug('Failed to complete trip:', error);
		}
	},
};

export * from './types';
