import { graphqlClient } from '@aigo/api/graphql';
import type { GeolocationResponse } from '@react-native-community/geolocation';
import crashlytics from '@react-native-firebase/crashlytics';
import { proxy, useSnapshot } from 'valtio';

import type { MapState } from './types';

const initialMapState = {};

const mapState: MapState = proxy(initialMapState);

export const useMapState = (): MapState => {
	return useSnapshot(mapState) as MapState;
};

export const getMapState = () => {
	// clone state to prevent unexpected mutation
	return { ...mapState };
};

export const mapActions = {
	setCurrentLocation: async (location: GeolocationResponse) => {
		mapState.currentLocation = location;

		if (!mapState.currentTrip) return;

		try {
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
	startNewTrip: async () => {
		const isCurrentRouteActive = !!mapState.currentTrip;
		if (isCurrentRouteActive) {
			throw new MapError('Need to complete current trip to start new trip');
		} else if (!mapState.currentLocation) {
			throw new MapError('Can not retrieve current location to start new trip');
		}

		try {
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
		if (!mapState.currentTrip) {
			throw new MapError('current trip not found, invalid end action');
		}

		try {
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
