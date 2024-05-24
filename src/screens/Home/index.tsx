import { useEffect } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import {
	getTrackingStatus,
	requestTrackingPermission,
} from 'react-native-tracking-transparency';
import { graphqlClient } from 'api/graphql';
import { appActions, appState } from 'state/app';

import DailyCheckIn from './DailyCheckIn';
import DailyMissions from './DailyMissions';
import Header from './Header';
import Invite from './Invite';
import Social from './Social';

export const HomeScreen = () => {
	useEffect(() => {
		const handleTrackingStatus = async () => {
			if (Platform.OS === 'ios') {
				const trackingStatus = await getTrackingStatus().catch((error) =>
					console.log(error),
				);

				if (trackingStatus === 'not-determined') {
					const status = await requestTrackingPermission();
					appState.trackingStatus = status;
				} else if (trackingStatus) {
					appState.trackingStatus = trackingStatus;
				}
			}
		};

		handleTrackingStatus();
	}, []);
	useEffect(() => {
		const loadUser = async () => {
			const { user } = await graphqlClient.getUser();
			if (user) appActions.setAppUser(user);
		};
		loadUser();
	}, []);

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
				<DailyMissions />
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
