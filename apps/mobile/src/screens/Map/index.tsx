import { useEffect, useMemo, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Camera, MapView } from '@rnmapbox/maps';
import {
	getCurrentPosition,
	handleRequestGeolocationPermission,
} from 'utils/geolocation';

import UserMarker from './UserMarker';

const INITIAL_COORDINATE: [number, number] = [-73.99155, 40.73581];

export const MapScreen = () => {
	const insets = useSafeAreaInsets();
	const { goBack } = useNavigation();
	const [coordinate, setCoordinate] = useState(INITIAL_COORDINATE);

	const scaleBarPosition = useMemo(() => {
		const top = Platform.OS === 'ios' ? 0 : Math.max(insets.top, 20);
		const left = Math.max(insets.left, 20);

		return { top, left };
	}, [insets]);

	const handleCurrentLocation = async () => {
		try {
			const location = await getCurrentPosition();
			if (location)
				setCoordinate([
					location.coords.longitude || INITIAL_COORDINATE[1],
					location.coords.altitude || INITIAL_COORDINATE[0],
				]);
		} catch (error) {
			console.log('handle current location error', error);
			// notify error
		}
	};

	useEffect(() => {
		handleRequestGeolocationPermission({
			onSuccess: () => {
				console.log('request geolocation successfully');
				handleCurrentLocation();
			},
			onDenied: () => {
				goBack();
				// notify denied
			},
			onUnavailable: () => {
				goBack();
				// notify unavailable
			},
		});
	}, []);

	return (
		<MapView style={styles.map} scaleBarPosition={scaleBarPosition}>
			<Camera centerCoordinate={coordinate} />
			<UserMarker coordinate={coordinate} />
		</MapView>
	);
};

export default MapScreen;

const styles = StyleSheet.create({
	map: {
		flex: 1,
	},
});
