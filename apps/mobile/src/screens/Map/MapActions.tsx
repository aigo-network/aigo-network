import { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AppButton from '@aigo/components/AppButton';
import { mapActions, useMapState } from 'state/map';

export const MapActions = () => {
	const { currentTrip: currentRoute } = useMapState();
	const [loading, setLoading] = useState(false);

	const handlePressStart = async () => {
		setLoading(true);
		await mapActions.startNewTrip();
		setLoading(false);
	};

	const handlePressEnd = async () => {
		setLoading(true);
		await mapActions.endCurrentTrip();
		setLoading(false);
	};

	return (
		<View style={styles.container}>
			{loading ? (
				<ActivityIndicator size={'large'} />
			) : !currentRoute ? (
				<AppButton title="Start" onPress={handlePressStart} />
			) : (
				<AppButton title="End your journey" onPress={handlePressEnd} />
			)}
		</View>
	);
};

export default MapActions;

const styles = StyleSheet.create({
	container: {},
});
