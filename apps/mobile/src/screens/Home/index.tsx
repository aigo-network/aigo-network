import { useEffect } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import {
	getTrackingStatus,
	requestTrackingPermission,
} from 'react-native-tracking-transparency';
import { graphqlClient } from '@aigo/api/graphql';
import { appActions } from 'state/app';

import DailyCheckIn from './DailyCheckIn';
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
					await requestTrackingPermission();
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
				{/* <DailyMissions /> */}
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
