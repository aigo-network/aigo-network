import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { useTransparencyTracking, useUserProfile } from 'utils/hooks/app';
import { useNotificationPermissionRequest } from 'utils/hooks/notification';
import { useSnapshot } from 'valtio';

import ActiveBanners from './ActiveBanners';
import Balance from './Balance';
import DailyCheckIn from './DailyCheckIn';
import Header from './Header';
import Invite from './Invite';
import StartTrip from './StartTrip';

export const HomeScreen = () => {
	useUserProfile();
	useTransparencyTracking();
	useNotificationPermissionRequest();
	const { bottom } = useSafeAreaInsets();

	const { remoteConfig } = useSnapshot(appState);

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
				<ActiveBanners />
				<DailyCheckIn />
				<Invite />
				{/* <DailyMissions /> */}
			</ScrollView>

			{remoteConfig.enableMapFeature && <StartTrip />}
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
