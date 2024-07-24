import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { useMapState } from 'state/map';
import { useDebouncedCallback } from 'use-debounce';
import { queryReverseGeocode } from 'utils/mapbox';

export const MapInfo = () => {
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
				console.log('failed to query reverse geocode', error);
			}
		}
	}, 2000);

	useEffect(() => {
		debouncedUpdateReverseGeocode();
	}, [currentLocation]);

	return (
		<View style={styles.locationInfoContainer}>
			<View style={styles.activeCircleOuter}>
				<View style={styles.activeCircle} />
			</View>
			<View style={styles.locationTextInfoContainer}>
				<Text style={styles.roadText}>{locationInfo.mainPlace}</Text>
				<Text style={styles.placeText}>{locationInfo.place}</Text>
			</View>
		</View>
	);
};

export default MapInfo;

const styles = StyleSheet.create({
	locationInfoContainer: {
		flexDirection: 'row',
		gap: 14,
		padding: 14,
		borderRadius: 14,
		backgroundColor: '#ffffff',
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
	locationTextInfoContainer: {
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
