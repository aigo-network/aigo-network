import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapView } from '@rnmapbox/maps';

export const MapScreen = () => {
	const insets = useSafeAreaInsets();
	const top = Platform.OS === 'ios' ? 0 : Math.max(insets.top, 20);
	const left = Math.max(insets.left, 20);

	return (
		<View style={styles.container}>
			<MapView style={styles.map} scaleBarPosition={{ top, left }}></MapView>
		</View>
	);
};

export default MapScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		flex: 1,
	},
});
