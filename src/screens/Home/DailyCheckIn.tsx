import { useState } from 'react';
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { graphqlClient } from 'api/graphql';
import CheckIn from 'components/CheckIn';
import { appActions, appState } from 'state/app';
import { useSnapshot } from 'valtio';

import { sharedStyles, showCheckInPoint } from './shared';

export const DailyCheckIn = () => {
	const { appUser } = useSnapshot(appState);
	const [loading, setLoading] = useState(false);
	const todayCheckedIn = !!appUser?.dailyMissions?.checkIn?.completed;

	const handleCheckIn = async () => {
		setLoading(true);
		const { checkIn } = await graphqlClient.checkIn();
		if (checkIn) appActions.updateCheckIn(checkIn);
		if (checkIn?.completed) {
			showCheckInPoint();
		}
		setLoading(false);
	};

	return (
		<View style={[sharedStyles.container, styles.container]}>
			<View style={styles.titleContainer}>
				<Text style={sharedStyles.title}>DailyCheckin</Text>
				{loading ? (
					<View style={styles.loadingContainer}>
						<ActivityIndicator />
					</View>
				) : (
					<TouchableOpacity
						style={[
							styles.checkInButton,
							todayCheckedIn && styles.disableCheckInButton,
						]}
						onPress={handleCheckIn}
						disabled={todayCheckedIn}
						hitSlop={14}
					>
						<Text>Check in</Text>
					</TouchableOpacity>
				)}
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
	loadingContainer: {
		width: 50,
		height: 33,
		alignItems: 'center',
		justifyContent: 'center',
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
	disableCheckInButton: {
		backgroundColor: '#BEB2EB80',
	},
});
