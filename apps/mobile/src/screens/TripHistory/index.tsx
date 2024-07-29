import { FlatList, StyleSheet, View } from 'react-native';
import SafeContainer from '@aigo/components/SafeContainer';
import ScreenHeader from 'components/ScreenHeader';
import { defaultTheme } from 'utils/global';
import { useTrips } from 'utils/hooks/trips';

import TripItem from './TripItem';

export const TripHistoryScreen = () => {
	const { trips } = useTrips();

	return (
		<View style={styles.container}>
			<SafeContainer>
				<ScreenHeader title="Trip History" />
				<FlatList
					style={styles.scrollContainer}
					contentContainerStyle={styles.scrollContentContainer}
					showsVerticalScrollIndicator={false}
					data={trips}
					renderItem={({ item }) => <TripItem trip={item} />}
				/>
			</SafeContainer>
		</View>
	);
};

export default TripHistoryScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		backgroundColor: defaultTheme.bgLight,
	},
	scrollContainer: {
		flex: 1,
		marginTop: 14,
	},
	scrollContentContainer: {
		flexGrow: 1,
		gap: 14,
	},
});
