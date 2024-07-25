import { useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as turf from '@turf/turf';
import { getMapState, useMapState } from 'state/map';

export const HCMLocation = [106.6297, 10.8231];

export const emptyRoute: GeoJSON.LineString = {
	type: 'LineString',
	coordinates: [
		[0, 0],
		[0, 0],
	],
};

export const useCurrentCoordinate = () => {
	const { currentLocation } = useMapState();

	const coordinate = useMemo(() => {
		if (!currentLocation) return;
		const { longitude, latitude } = currentLocation.coords;

		return [longitude, latitude];
	}, [currentLocation]);

	return { coordinate };
};

const MS_PER_MINUTE = 1000 * 60;

export const useCurrentTrip = () => {
	const { currentTrip } = useMapState();
	const [time, setTime] = useState(0);

	const distance = useMemo(() => {
		if (!currentTrip) return 0;

		const line = turf.lineString(currentTrip.coordinates);
		const length = turf.length(line, { units: 'kilometers' });

		return length.toPrecision(2);
	}, [currentTrip]);

	useEffect(() => {
		const timer = setInterval(() => {
			const trip = getMapState().currentTrip;
			if (!trip) return;

			const timeInMs = new Date().valueOf() - trip.startedAt.valueOf();
			setTime(Math.round(timeInMs / MS_PER_MINUTE));
		}, MS_PER_MINUTE);

		return () => clearInterval(timer);
	}, []);

	return { distance, time };
};

export const useBouncedMapInsets = () => {
	const insets = useSafeAreaInsets();

	const safeInsets = useMemo(() => {
		const top = Math.max(insets.top, 20);
		const bottom = Math.max(insets.top, 20);

		return { ...insets, top, bottom };
	}, [insets]);

	const scaleBarPosition = useMemo(() => {
		const top = Platform.OS === 'ios' ? 0 : Math.max(insets.top, 20);
		const left = Math.max(insets.left, 20);

		return { top, left };
	}, [insets]);

	return { safeInsets, scaleBarPosition };
};
