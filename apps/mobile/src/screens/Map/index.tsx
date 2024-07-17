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

import { emptyRoute } from './shared';
import UserMarker from './UserMarker';

export const MapScreen = () => {
	const insets = useSafeAreaInsets();
	const { goBack } = useNavigation();

	const { currentLocation, currentRoute } = useMapState();

	const [loading, setLoading] = useState(false);
	const [geocodeFeature, setGeocodeFeature] = useState<GeocodeFeature>();

	const bouncedInsets = useMemo(() => {
		const top = Math.max(insets.top, 20);
		const bottom = Math.max(insets.top, 20);

		return { ...insets, top, bottom };
	}, [insets]);

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
				watchLocation(async (position) => {
					await mapActions.setCurrentLocation(position);
				});
			},
			onDenied: () => goBack(),
			onUnavailable: () => goBack(),
		});
	}, []);

	useEffect(() => {
		debouncedUpdateReverseGeocode();
	}, [currentLocation]);

	return (
		<View style={styles.container}>
			<MapView style={styles.mapContainer} scaleBarPosition={scaleBarPosition}>
				<Camera
					centerCoordinate={currentCoordinate}
					zoomLevel={14}
					animationMode="moveTo"
				/>

				{currentCoordinate && <UserMarker coordinate={currentCoordinate} />}

				<ShapeSource id="user-route" shape={currentRoute || emptyRoute}>
					<LineLayer
						id="user-route-layer-outer"
						style={{ lineColor: '#BEB2EB80', lineWidth: 18 }}
					/>
					<LineLayer
						id="user-route-layer"
						style={{ lineColor: '#5932EA', lineWidth: 6 }}
					/>
				</ShapeSource>
			</MapView>

			<View style={[styles.infoContainer, { top: bouncedInsets.top + 30 }]}>
				<View style={styles.locationInfoContainer}>
					<View style={styles.activeCircleOuter}>
						<View style={styles.activeCircle} />
					</View>
					<View style={styles.locationTextInfoContainer}>
						<Text style={styles.roadText}>{locationInfo.mainPlace}</Text>
						<Text style={styles.placeText}>{locationInfo.place}</Text>
					</View>
				</View>
			</View>

			<View style={[styles.buttonContainer, { bottom: bouncedInsets.bottom }]}>
				{loading ? (
					<ActivityIndicator size={'large'} />
				) : !currentRoute ? (
					<AppButton title="Start" onPress={handlePressStart} />
				) : (
					<AppButton title="End your journey" onPress={handlePressEnd} />
				)}
			</View>
		</View>
	);
};

export default MapScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	mapContainer: {
		flex: 1,
	},
	infoContainer: {
		position: 'absolute',
		top: 0,
		left: 20,
		minWidth: 240,
		maxWidth: 300,
	},
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
	buttonContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		paddingHorizontal: 20,
	},
});
