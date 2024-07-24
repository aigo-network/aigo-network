import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { mapActions } from 'state/map';
import { requestGeolocationPermission, watchLocation } from 'utils/geolocation';

import MapActions from './MapActions';
import MapInfo from './MapInfo';
import MapView from './MapView';
import { useBouncedMapInsets } from './shared';

export const MapScreen = () => {
	const { goBack } = useNavigation();
	const { safeInsets } = useBouncedMapInsets();
	const { top, bottom } = safeInsets;
	const [mapReady, setMapReady] = useState(false);
	const [permissionReady, setPermissionReady] = useState(false);

	const handleFinishLoadingMap = useCallback(() => {
		console.debug('Finish loading map');
		setMapReady(true);
	}, []);

	useEffect(() => {
		requestGeolocationPermission({
			onSuccess: async () => {
				console.debug('Successfully request geolocation permission');
				setPermissionReady(true);
				watchLocation(async (position) => {
					await mapActions.setCurrentLocation(position);
				});
			},
			onDenied: () => goBack(),
			onUnavailable: () => goBack(),
		});
	}, []);

	return (
		<View style={styles.container}>
			<MapView
				style={styles.mapContainer}
				onDidFinishLoadingMap={handleFinishLoadingMap}
			/>

			<View style={[styles.infoContainer, { top: top + 30 }]}>
				<MapInfo />
			</View>

			<View style={[styles.buttonContainer, { bottom }]}>
				{mapReady && permissionReady && <MapActions />}
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
	buttonContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		paddingHorizontal: 20,
	},
});
