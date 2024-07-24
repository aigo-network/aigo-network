import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { mapActions } from 'state/map';
import { requestGeolocationPermission, watchLocation } from 'utils/geolocation';

import MapActions from './MapActions';
import MapInfo from './MapInfo';
import MapView from './MapView';

export const MapScreen = () => {
	const { goBack } = useNavigation();
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
