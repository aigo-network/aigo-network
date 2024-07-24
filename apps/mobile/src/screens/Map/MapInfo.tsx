import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { useMapState } from 'state/map';
import { useDebouncedCallback } from 'use-debounce';
import { queryReverseGeocode } from 'utils/mapbox';

import { useBouncedMapInsets } from './shared';

export const MapInfo = () => {
	const { safeInsets } = useBouncedMapInsets();
	const { top } = safeInsets;
	const { currentLocation } = useMapState();
	const [geocodeFeature, setGeocodeFeature] = useState<GeocodeFeature>();

	const locationInfo = useMemo(() => {
		if (!geocodeFeature) return { mainPlace: 'Unknown', place: '' };

		const [mainPlace, ...placeParts] = geocodeFeature.place_name.split(',');
		const place = placeParts.join(',').trim();

		return { mainPlace, place };
	}, [geocodeFeature]);

	const debouncedUpdateReverseGeocode = useDebouncedCallback(async () => {
		if (currentLocation) {
			const { longitude, latitude } = currentLocation.coords;
			try {
				const reversedGeocodeRes = await queryReverseGeocode(
					longitude,
					latitude,
				);
				setGeocodeFeature(reversedGeocodeRes.body.features[0]);
			} catch (error) {
				console.debug('Failed to query reverse geocode', error);
			}
		}
	}, 2000);

	useEffect(() => {
		debouncedUpdateReverseGeocode();
	}, [currentLocation]);

	return (
		<View style={[styles.container, { top: top + 30 }]}>
			<View style={styles.locationContainer}>
				<View style={styles.activeCircleOuter}>
					<View style={styles.activeCircle} />
				</View>
				<View style={styles.locationTextContainer}>
					<Text style={styles.roadText}>{locationInfo.mainPlace}</Text>
					<Text style={styles.placeText}>{locationInfo.place}</Text>
				</View>
			</View>
		</View>
	);
};

export default MapInfo;

const styles = StyleSheet.create({
	container: {
		padding: 14,
		borderRadius: 14,
		backgroundColor: '#ffffff',
		position: 'absolute',
		top: 0,
		left: 20,
		minWidth: 240,
		maxWidth: 300,
	},
	locationContainer: {
		flexDirection: 'row',
		gap: 14,
	},
	activeCircleOuter: {
		padding: 8,
		borderRadius: 30,
		backgroundColor: '#E8F9EE',
		alignSelf: 'center',
	},
	activeCircle: {
		width: 12,
		height: 12,
		borderRadius: 10,
		backgroundColor: '#0EBC93',
	},
	locationTextContainer: {
		flex: 1,
	},
	roadText: {
		fontWeight: '600',
		color: '#232323',
	},
	placeText: {
		fontSize: 12,
		color: '#B0B0B0',
	},
});
