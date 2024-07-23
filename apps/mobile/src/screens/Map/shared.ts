import { useMemo } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMapState } from 'state/map';

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
