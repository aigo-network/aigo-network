import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { graphqlClient } from 'api/graphql';
import { appActions, appState } from 'state/app';
import { useSnapshot } from 'valtio';

import Header from './Header';
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
			<View style={styles.mainContainer}>
				<Social />
			</View>
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
		paddingHorizontal: 16,
	},
});
