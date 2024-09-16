import { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { mapActions, useMapState } from 'state/map';
import { requestGeolocationPermission, watchLocation } from 'utils/geolocation';

import MapView from './MapView';
import TripActions from './TripActions';
import TripInfo from './TripInfo';

let depinScanRegistered = false;

export const MapScreen = () => {
	const { reset } = useNavigation();
	const { mapReady, permissionReady } = useMapState();

	const handleFinishLoadingMap = useCallback(() => {
		console.debug('Finish loading map');
		mapActions.setMapReady(true);
	}, []);

	const handleSuccessRequestGeoPermission = useCallback(async () => {
		mapActions.setPermissionReady(true);

		watchLocation(async (position) => {
			console.debug('Location change', new Date(position.timestamp));
			await mapActions.throttledSetCurrentLocation(position);
			if (depinScanRegistered === false) {
				depinScanRegistered = true;
				await mapActions.registerDePINScan(position);
			}
		});
	}, []);

	const handleRequestPermissionFailed = useCallback(() => {
		setTimeout(() => {
			reset({ routes: [{ name: 'BottomTab', params: { screen: 'Home' } }] });
		}, 1000);
	}, []);

	useEffect(() => {
		requestGeolocationPermission({
			onSuccess: () => handleSuccessRequestGeoPermission(),
			onDenied: () => handleRequestPermissionFailed(),
			onUnavailable: () => handleRequestPermissionFailed(),
		});
	}, []);

	return (
		<View style={styles.container}>
			<MapView onDidFinishLoadingMap={handleFinishLoadingMap} />
			<TripInfo />
			{mapReady && permissionReady && <TripActions />}
		</View>
	);
};

export default MapScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
