import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MapView } from '@rnmapbox/maps';
import { mapActions } from 'state/map';
import { requestGeolocationPermission, watchLocation } from 'utils/geolocation';

import Camera from './Camera';
import MapActions from './MapActions';
import MapInfo from './MapInfo';
import { useBouncedMapInsets } from './shared';
import TripRoute from './TripRoute';
import UserMarker from './UserMarker';

export const MapScreen = () => {
	const { goBack } = useNavigation();
	const {
		safeInsets: { top, bottom },
		scaleBarPosition,
	} = useBouncedMapInsets();

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

	return (
		<View style={styles.container}>
			<MapView style={styles.mapContainer} scaleBarPosition={scaleBarPosition}>
				<Camera />
				<UserMarker />
				<TripRoute />
			</MapView>

			<View style={[styles.infoContainer, { top: top + 30 }]}>
				<MapInfo />
			</View>

			<View style={[styles.buttonContainer, { bottom }]}>
				<MapActions />
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
