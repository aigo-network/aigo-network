import { ScrollView, StyleSheet, View } from 'react-native';
import { defaultTheme } from 'utils/global';
import { useTransparencyTracking, useUserProfile } from 'utils/hooks/app';
import { useNotificationPermissionRequest } from 'utils/hooks/notification';

import DailyCheckIn from './DailyCheckIn';
import Header from './Header';
import Invite from './Invite';
import Social from './Social';

export const HomeScreen = () => {
	useUserProfile();
	useTransparencyTracking();
	useNotificationPermissionRequest();

	return (
		<View style={styles.container}>
			<Header />
			<ScrollView
				style={styles.mainContainer}
				contentContainerStyle={styles.mainContentContainer}
			>
				<Social />
				<Invite />
				<DailyCheckIn />
			</ScrollView>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.bgLight,
	},
	mainContainer: {
		flex: 1,
	},
	mainContentContainer: {
		flexGrow: 1,
		paddingHorizontal: 16,
		gap: 16,
		paddingTop: 10,
	},
});
