import { useEffect, useMemo, useState } from 'react';
import type { Trip, TripConnection } from '@aigo/api/sdk';
import * as turf from '@turf/turf';
import { mapActions, useMapState } from 'state/map';
import { formatMsToHMS, formatTimeDiffToHMS } from 'utils/datetime';
import { queryReverseGeocode } from 'utils/mapbox';

type Trips = {
	trips: Trip[];
	lastTripConnection?: TripConnection;
};

export const useTrips = (): Trips => {
	const { trips, lastTripConnection } = useMapState();

	useEffect(() => {
		if (trips) return;
		mapActions.queryAndUpdateTripsState();
	}, []);

	return { trips: trips || [], lastTripConnection };
};

type InspectedTrip = {
	route: GeoJSON.LineString;
	startPosition: string;
	distance: string | number;
	time: string;
	startTime: Date;
	endTime: Date;
	avgSpeed: string | number;
};

type InspectingTripOptions = {
	loadStartPosition: boolean;
};

export const useInspectingTrip = (
	trip: Trip,
	options: InspectingTripOptions = {
		loadStartPosition: true,
	},
): InspectedTrip => {
	const [startPosition, setStartPosition] = useState('');
	const startTime = new Date(trip.createdAt);
	const endTime = new Date(trip.updatedAt);

	const route = useMemo(() => {
		return JSON.parse(trip.route) as GeoJSON.LineString;
	}, [trip.route]);

	const time = useMemo(() => {
		const time = formatTimeDiffToHMS(endTime, startTime);
		if (time.startsWith('00:')) return time.replace('00:', '');

		return time;
	}, [trip]);

	const distance = useMemo(() => {
		if (!route || route.coordinates.length < 2) return 0;

		const line = turf.lineString(route.coordinates);
		const length = turf.length(line, { units: 'kilometers' });

		return length.toPrecision(2);
	}, [route]);

	const avgSpeed = useMemo(() => {
		const timeInMs = endTime.valueOf() - startTime.valueOf();
		if (timeInMs === 0) return 0;

		const timeInHour = timeInMs / (60 * 60 * 1000);

		return (Number(distance) / timeInHour).toPrecision(2);
	}, [distance]);

	useEffect(() => {
		if (!options.loadStartPosition) return;
		if (!route || route.coordinates.length < 1) return;

		const handleStartLocation = async () => {
			const [longitude, latitude] = route.coordinates[0];
			const reversedGeocodeRes = await queryReverseGeocode(longitude, latitude);
			const mainFeature = reversedGeocodeRes.body.features[0];
			setStartPosition(mainFeature?.place_name || 'Unknown');
		};

		handleStartLocation();
	}, [route]);

	return { startPosition, route, distance, startTime, endTime, time, avgSpeed };
};

type InspectedTrips = {
	routes: GeoJSON.LineString[];
	totalDistance: string | number;
	totalTime: string;
	totalTimeInMs: number;
	avgSpeed: string | number;
};

export const useInspectingTrips = (trips: Trip[]): InspectedTrips => {
	const routes = useMemo(() => {
		return trips.map((trip) => JSON.parse(trip.route) as GeoJSON.LineString);
	}, [trips]);

	const totalTimeInMs = useMemo(() => {
		const timeInMs = trips.reduce((prev, curTrip) => {
			const currentStart = new Date(curTrip.createdAt);
			const currentEnd = new Date(curTrip.updatedAt);

			return prev + currentEnd.valueOf() - currentStart.valueOf();
		}, 0);

		return timeInMs;
	}, [trips]);

	const totalTime = useMemo(() => {
		const time = formatMsToHMS(totalTimeInMs);
		if (time.startsWith('00:')) return time.replace('00:', '');

		return time;
	}, [totalTimeInMs]);

	const totalDistance = useMemo(() => {
		if (!routes.length) return 0;

		const distance = routes.reduce((prev, curRoute) => {
			if (curRoute.coordinates.length < 2) return prev;

			const line = turf.lineString(curRoute.coordinates);
			const length = turf.length(line, { units: 'kilometers' });
			return prev + length;
		}, 0);

		return distance.toPrecision(2);
	}, [routes]);

	const avgSpeed = useMemo(() => {
		const totalTimeInHour = totalTimeInMs / (60 * 60 * 1000);
		if (totalTimeInHour === 0) return 0;

		return (Number(totalDistance) / totalTimeInHour).toPrecision(2);
	}, [totalDistance, totalTimeInMs]);

	return {
		routes,
		totalDistance,
		totalTime,
		totalTimeInMs,
		avgSpeed,
	};
};
