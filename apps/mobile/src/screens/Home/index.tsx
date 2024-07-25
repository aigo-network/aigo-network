import { ScrollView, StyleSheet, View } from 'react-native';
import { appState } from 'state/app';
import { useTransparencyTracking, useUserProfile } from 'utils/hooks/app';
import { useNotificationPermissionRequest } from 'utils/hooks/notification';
import { useSnapshot } from 'valtio';

import DailyCheckIn from './DailyCheckIn';
import Header from './Header';
import Invite from './Invite';
import Map from './Map';
import Social from './Social';

export const HomeScreen = () => {
	useUserProfile();
	useTransparencyTracking();
	useNotificationPermissionRequest();

	const { remoteConfig } = useSnapshot(appState);

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
				{/* <DailyMissions /> */}
				{remoteConfig.enableMapFeature && <Map />}
			</ScrollView>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F7F7F7',
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
