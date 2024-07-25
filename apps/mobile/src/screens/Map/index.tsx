import { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { mapActions, useMapState } from 'state/map';
import { requestGeolocationPermission, watchLocation } from 'utils/geolocation';

import MapActions from './MapActions';
import MapInfo from './MapInfo';
import MapView from './MapView';

export const MapScreen = () => {
	const { goBack } = useNavigation();
	const { mapReady, permissionReady } = useMapState();

	const handleFinishLoadingMap = useCallback(() => {
		console.debug('Finish loading map');
		mapActions.setMapReady(true);
	}, []);

	const handleSuccessRequestGeoPermission = useCallback(async () => {
		console.debug('Successfully request geolocation permission');

		mapActions.setPermissionReady(true);

		watchLocation(async (position) => {
			console.debug('Location change', new Date(position.timestamp));
			await mapActions.throttledSetCurrentLocation(position);
		});
	}, []);

	useEffect(() => {
		requestGeolocationPermission({
			onSuccess: () => handleSuccessRequestGeoPermission(),
			onDenied: () => goBack(),
			onUnavailable: () => goBack(),
		});
	}, []);

	return (
		<View style={styles.container}>
			<MapView onDidFinishLoadingMap={handleFinishLoadingMap} />
			<MapInfo />
			{mapReady && permissionReady && <MapActions />}
		</View>
	);
};

export default MapScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
