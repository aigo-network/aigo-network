import { StyleSheet, View } from 'react-native';
import { MapView } from '@rnmapbox/maps';

export const MapScreen = () => {
	return (
		<View style={styles.container}>
			<MapView style={styles.map} />
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
