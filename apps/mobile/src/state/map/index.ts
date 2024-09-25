import device from 'react-native-device-info';
import { graphqlClient } from '@aigo/api/graphql';
import type { Trip, TripConnection } from '@aigo/api/sdk';
import type { GeolocationResponse } from '@react-native-community/geolocation';
import crashlytics from '@react-native-firebase/crashlytics';
import pThrottle from 'p-throttle';
import { appState } from 'state/app';
import { registerDePINScan } from 'utils/iotex';
import { proxy, useSnapshot } from 'valtio';

import { getLastTripId, removeLastTripId, setLastTripId } from './storage';
import type { MapState, PagingParams, TripMetadata } from './types';

const initialMapState: MapState = {};

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
				location = { ...location, timestamp: new Date().getTime() };
				mapState.currentLocation = location;

				if (!mapState.currentTrip) return;

				const { coords } = location;

				await graphqlClient.insertTripPoint({
					tripId: mapState.currentTrip.id,
					geolocation: { ...coords, timestamp: new Date() },
				});

				const { longitude, latitude } = coords;

				mapState.currentTrip.coordinates.push([longitude, latitude]);
			} catch (error) {
				crashlytics().recordError(error as Error, 'insertTripPoint');
				console.debug('Failed to insert trip point:', error);
			}
		},
	),
	setStartTripMetadata(metadata: TripMetadata) {
		mapState.startTripMetadata = metadata;
	},
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

			const { coords } = mapState.currentLocation;

			const { startTrip: trip } = await graphqlClient.startTrip({
				geolocation: { ...coords, timestamp: new Date() },
				metadata: {
					userType: mapState.startTripMetadata?.userType,
					purpose: mapState.startTripMetadata?.purpose,
				},
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

			mapState.startTripMetadata = undefined;

			await setLastTripId(trip.id);
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

			const { completeTrip } = await graphqlClient.completeTrip({
				tripId: mapState.currentTrip.id,
			});

			if (!completeTrip) {
				throw new MapError('Complete trip return null');
			}

			mapState.completedTrip = completeTrip;
			mapState.currentTrip = undefined;

			await removeLastTripId();
		} catch (error) {
			crashlytics().recordError(error as Error, 'completeTrip');
			console.debug('Failed to complete trip:', error);
		}
	},
	queryAndUpdateTripsState: async (
		params: PagingParams = { after: '', first: 10 },
		append?: boolean,
	) => {
		try {
			const { trips } = await graphqlClient.getTrips(params);
			mapState.lastTripConnection = trips as TripConnection;
			const tripNodes = trips?.edges.map((e) => e?.node).filter((e) => !!e);
			if (tripNodes) {
				if (!append || !mapState.trips) {
					mapState.trips = tripNodes as Trip[];
				} else {
					mapState.trips.push(...(tripNodes as Trip[]));
				}
			}
		} catch (error) {
			crashlytics().recordError(error as Error, 'getTrips');
		}
	},
	syncLastTripFromStorage: async () => {
		try {
			const lastTripId = await getLastTripId();
			if (!lastTripId) {
				console.debug('No LastTripId found to resync');
				return;
			}

			const { trip } = await graphqlClient.getTrip({ tripId: lastTripId });
			if (!trip) {
				console.debug('Can not fetch last trip from storage');
				await removeLastTripId();
				return;
			}

			const route = JSON.parse(trip.route) as GeoJSON.LineString;

			// coordinates must be an array of two or more positions
			if (route.coordinates.length === 1) {
				route.coordinates.push(route.coordinates[0]);
			}

			if (trip.status === 'STARTED') {
				mapState.currentTrip = {
					id: trip.id as string,
					startedAt: new Date(trip.startTime),
					...route,
				};
			} else {
				await removeLastTripId();
			}
		} catch (error) {
			crashlytics().recordError(error as Error, 'syncLastTrip');
		}
	},
	registerDePINScan: async (position: GeolocationResponse) => {
		try {
			return await registerDePINScan({
				deviceId: await device.getUniqueId(),
				latitude: position?.coords.latitude,
				longitude: position?.coords.longitude,
			});
		} catch (error) {
			console.log(error);
		}
	},
};

export * from './types';
