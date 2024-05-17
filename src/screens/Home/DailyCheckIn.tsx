import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import CheckIn from 'components/CheckIn';

import { sharedStyles } from './shared';

export const DailyCheckIn = () => {
	return (
		<View style={[sharedStyles.container, styles.container]}>
			<View style={styles.titleContainer}>
				<Text style={sharedStyles.title}>DailyCheckin</Text>
				<TouchableOpacity style={styles.checkInButton}>
					<Text>Check in</Text>
				</TouchableOpacity>
			</View>
			<ScrollView
				style={styles.checkInsContainer}
				contentContainerStyle={styles.checkInsContentContainer}
				showsHorizontalScrollIndicator={false}
			>
				<CheckIn width={10} status="checkedIn" dayNumber={1} />
				<CheckIn width={10} status="missed" dayNumber={2} />
				<CheckIn width={10} status="today" dayNumber={3} />
				<CheckIn width={10} status="next" dayNumber={4} />
				<CheckIn width={10} status="next" dayNumber={5} />
				<CheckIn width={10} status="next" dayNumber={6} />
				<CheckIn width={10} status="next" dayNumber={7} />
			</ScrollView>
		</View>
	);
};

export default DailyCheckIn;

const styles = StyleSheet.create({
	container: {
		paddingTop: 10,
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	checkInsContainer: {
		flexDirection: 'row',
	},
	checkInsContentContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 10,
	},
	checkInButton: {
		padding: 8,
		paddingHorizontal: 18,
		borderRadius: 20,
		backgroundColor: '#6740FF',
	},
});
