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
	const [loading, setLoading] = useState(false);
	const { content, appUser } = useSnapshot(appState);
	const homeContent = content.screens.home;
	const todayCheckedIn = !!appUser?.dailyMissions?.checkIn?.completed;

	const handleCheckIn = async () => {
		setLoading(true);
		const { checkIn } = await graphqlClient.checkIn();
		const { user } = await graphqlClient.getUser();
		if (user) appActions.setAppUser(user);
		if (checkIn) appActions.updateCheckIn(checkIn);
		if (checkIn?.completed) {
			showCheckInPoint();
		}
		setLoading(false);
	};

	return (
		<View style={[sharedStyles.container, styles.container]}>
			<View style={styles.titleContainer}>
				<Text style={sharedStyles.title}>
					{homeContent.dailyCheckInSection.title}
				</Text>
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
						<Text>{homeContent.dailyCheckInSection.checkInButton}</Text>
					</TouchableOpacity>
				)}
			</View>
			<ScrollView
				horizontal
				snapToInterval={checkInWidth + 4}
				style={styles.checkInsContainer}
				contentContainerStyle={styles.checkInsContentContainer}
				showsHorizontalScrollIndicator={false}
			>
				<CheckIn width={checkInWidth} status="checkedIn" dayNumber={1} />
				<CheckIn width={checkInWidth} status="missed" dayNumber={2} />
				<CheckIn width={checkInWidth} status="today" dayNumber={3} />
				<CheckIn width={checkInWidth} status="next" dayNumber={4} />
				<CheckIn width={checkInWidth} status="next" dayNumber={5} />
				<CheckIn width={checkInWidth} status="next" dayNumber={6} />
				<CheckIn width={checkInWidth} status="next" dayNumber={7} />
			</ScrollView>
		</View>
	);
};

export default DailyCheckIn;

const checkInWidth = 66;
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
