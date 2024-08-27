import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { defaultTheme } from 'utils/global';
import { useTransparencyTracking, useUserProfile } from 'utils/hooks/app';
import { useNotificationPermissionRequest } from 'utils/hooks/notification';
import { useRecoverLastTrip } from 'utils/hooks/trips';

import ActiveBanners from './ActiveBanners';
import Balance from './Balance';
import DailyCheckIn from './DailyCheckIn';
import Header from './Header';
import Invite from './Invite';
import TripSummary from './TripSummary';

export const HomeScreen = () => {
	useUserProfile();
	useTransparencyTracking();
	useNotificationPermissionRequest();
	useRecoverLastTrip();

	const { bottom } = useSafeAreaInsets();

	return (
		<View
			style={[
				styles.container,
				{ paddingBottom: Platform.OS === 'android' ? 30 : bottom },
			]}
		>
			<Header />
			<ScrollView
				style={styles.mainContainer}
				contentContainerStyle={styles.mainContentContainer}
			>
				{/* <Social /> */}
				<Balance />
				<TripSummary />
				<ActiveBanners />
				<DailyCheckIn />
				<Invite />
				{/* <DailyMissions /> */}
			</ScrollView>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.bgLight,
		gap: 16,
		position: 'relative',
	},
	mainContainer: {
		flex: 1,
	},
	mainContentContainer: {
		flexGrow: 1,
		paddingHorizontal: 16,
		paddingBottom: 100,
		gap: 16,
	},
});
