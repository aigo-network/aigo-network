import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppButton } from '@aigo/components/AppButton';
import { useNavigation } from '@react-navigation/native';
import { Camera, MapView, ShapeSource } from '@rnmapbox/maps';
import { LineLayer } from '@rnmapbox/maps';
import { mapActions, useMapState } from 'state/map';
import { requestGeolocationPermission, watchLocation } from 'utils/geolocation';

import UserMarker from './UserMarker';

export const MapScreen = () => {
	const insets = useSafeAreaInsets();
	const { goBack } = useNavigation();

	const { currentLocation, currentRoute } = useMapState();

	const [loading, setLoading] = useState(false);

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
						id="user-route-layer"
						style={{ lineColor: 'red', lineWidth: 12 }}
					/>
				</ShapeSource>
			)}

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
	buttonContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		paddingHorizontal: 20,
	},
});
