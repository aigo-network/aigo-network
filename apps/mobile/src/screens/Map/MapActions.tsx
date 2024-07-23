import { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AppButton from '@aigo/components/AppButton';
import { mapActions, useMapState } from 'state/map';

export const MapActions = () => {
	const { currentRoute } = useMapState();
	const [loading, setLoading] = useState(false);

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
