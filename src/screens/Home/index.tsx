import { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { graphqlClient } from 'api/graphql';
import { appActions, appState } from 'state/app';
import { useSnapshot } from 'valtio';

import DailyCheckIn from './DailyCheckIn';
import DailyMissions from './DailyMissions';
import Header from './Header';
import Invite from './Invite';
import Social from './Social';

export const HomeScreen = () => {
	const { appUser } = useSnapshot(appState);
	console.log(appUser);

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
