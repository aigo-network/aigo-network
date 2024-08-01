import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMapState } from 'state/map';

import TripResult from './TripResult';

export const TripResultScreen = () => {
	const { navigate } = useNavigation();
	const { completedTrip } = useMapState();

	useEffect(() => {
		if (!completedTrip) navigate('Home');
	}, []);

	return (
		<View style={styles.container}>
			{completedTrip && <TripResult trip={completedTrip} />}
		</View>
	);
};

export default TripResultScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
