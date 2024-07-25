import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { useMapState } from 'state/map';
import { useDebouncedCallback } from 'use-debounce';
import { queryReverseGeocode } from 'utils/mapbox';

import { useBouncedMapInsets, useCurrentTrip } from './shared';

export const MapInfo = () => {
	const { safeInsets } = useBouncedMapInsets();
	const { top } = safeInsets;
	const { currentLocation, currentTrip } = useMapState();
	const { distance, time } = useCurrentTrip();
	const [geocodeFeature, setGeocodeFeature] = useState<GeocodeFeature>();

	const containerStyle = [
		styles.container,
		{ top: top + 30 },
		currentTrip && styles.fullWidthContainer,
	];

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
		<View style={containerStyle}>
			<View style={styles.innerContainer}>
				<View style={styles.locationContainer}>
					<View style={styles.activeCircleOuter}>
						<View style={styles.activeCircle} />
					</View>
					<View style={styles.locationTextContainer}>
						<Text style={styles.roadText}>{locationInfo.mainPlace}</Text>
						<Text style={styles.placeText}>{locationInfo.place}</Text>
					</View>
				</View>

				{currentTrip && (
					<View style={styles.tripContainer}>
						<Text style={styles.tripTitle}>Current journey</Text>
						<View>
							<Text style={styles.tripText}>{`Distance: ${distance} km`}</Text>
							<Text style={styles.tripText}>{`Time: ${time} minutes`}</Text>
						</View>
					</View>
				)}
			</View>
		</View>
	);
};

export default MapInfo;

const styles = StyleSheet.create({
	container: {
		left: 20,
		position: 'absolute',
		minWidth: 240,
		maxWidth: 300,
	},
	fullWidthContainer: {
		left: 20,
		right: 20,
		maxWidth: undefined,
	},
	innerContainer: {
		padding: 14,
		borderRadius: 14,
		backgroundColor: '#ffffff',
		flexDirection: 'row',
		gap: 20,
	},
	tripContainer: {
		minWidth: 130,
	},
	tripTitle: {
		fontSize: 14,
		fontWeight: '600',
		color: '#000000',
	},
	tripText: {
		color: '#232323',
	},
	locationContainer: {
		flex: 1,
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
