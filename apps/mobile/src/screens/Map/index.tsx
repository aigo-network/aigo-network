import { useEffect, useMemo, useState } from 'react';
import {
	ActivityIndicator,
	Platform,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppButton } from '@aigo/components/AppButton';
import type { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { useNavigation } from '@react-navigation/native';
import { Camera, MapView, ShapeSource } from '@rnmapbox/maps';
import { LineLayer } from '@rnmapbox/maps';
import { mapActions, useMapState } from 'state/map';
import { useDebouncedCallback } from 'use-debounce';
import { requestGeolocationPermission, watchLocation } from 'utils/geolocation';
import { queryReverseGeocode } from 'utils/mapbox';

import UserMarker from './UserMarker';

export const MapScreen = () => {
	const insets = useSafeAreaInsets();
	const { goBack } = useNavigation();

	const { currentLocation, currentRoute } = useMapState();

	const [loading, setLoading] = useState(false);
	const [geocodeFeature, setGeocodeFeature] = useState<GeocodeFeature>();

	const scaleBarPosition = useMemo(() => {
		const top = Platform.OS === 'ios' ? 0 : Math.max(insets.top, 20);
		const left = Math.max(insets.left, 20);

		return { top, left };
	}, [insets]);

	const currentCoordinate = useMemo(() => {
		if (!currentLocation) return;
		const { longitude, latitude } = currentLocation.coords;

		return [longitude, latitude];
	}, [currentLocation]);

	const locationInfo = useMemo(() => {
		if (!geocodeFeature) return { road: 'Unknown', place: '' };

		const [road, ...placeParts] = geocodeFeature.place_name.split(',');
		const place = placeParts.join(',').trim();

		return { road, place };
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

	const handlePressStart = async () => {
		setLoading(true);
		await mapActions.startNewRoute();
		setLoading(false);
	};

	const handlePressEnd = async () => {
		setLoading(true);
		await mapActions.endCurrentRoute();
		setLoading(false);
	};

	useEffect(() => {
		requestGeolocationPermission({
			onSuccess: async () => {
				console.log('successfully request geolocation permission');
			},
			onDenied: () => goBack(),
			onUnavailable: () => goBack(),
		});

		watchLocation(async (position) => {
			await mapActions.setCurrentLocation(position);
		});
	}, []);

	useEffect(() => {
		debouncedUpdateReverseGeocode();
	}, [currentLocation]);

	return (
		<MapView style={styles.map} scaleBarPosition={scaleBarPosition}>
			<Camera
				centerCoordinate={currentCoordinate}
				zoomLevel={14}
				animationMode="moveTo"
			/>

			{currentCoordinate && <UserMarker coordinate={currentCoordinate} />}

			{currentRoute && (
				<ShapeSource id="user-route" shape={currentRoute}>
					<LineLayer
						id="user-route-layer-outer"
						style={{ lineColor: '#BEB2EB80', lineWidth: 18 }}
					/>
					<LineLayer
						id="user-route-layer"
						style={{ lineColor: '#5932EA', lineWidth: 6 }}
					/>
				</ShapeSource>
			)}

			<View style={[styles.infoContainer, { top: insets.top }]}>
				<View style={styles.locationInfoContainer}>
					<View style={styles.activeCircleOuter}>
						<View style={styles.activeCircle} />
					</View>
					<View style={styles.locationTextInfoContainer}>
						<Text style={styles.roadText}>{locationInfo.road}</Text>
						<Text style={styles.placeText}>{locationInfo.place}</Text>
					</View>
				</View>
			</View>

			<View style={[styles.buttonContainer, { bottom: insets.bottom }]}>
				{loading ? (
					<ActivityIndicator size={'large'} />
				) : !currentRoute ? (
					<AppButton title="Start" onPress={handlePressStart} />
				) : (
					<AppButton title="End your journey" onPress={handlePressEnd} />
				)}
			</View>
		</MapView>
	);
};

export default MapScreen;

const styles = StyleSheet.create({
	map: {
		flex: 1,
	},
	infoContainer: {
		position: 'absolute',
		top: 0,
		left: 20,
		width: 220,
		backgroundColor: '#ffffff',
		padding: 14,
		borderRadius: 14,
	},
	locationInfoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 14,
	},
	activeCircleOuter: {
		padding: 8,
		borderRadius: 30,
		backgroundColor: '#E8F9EE',
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
	buttonContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		paddingHorizontal: 20,
	},
});
