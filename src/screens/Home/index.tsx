import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { graphqlClient } from 'api/graphql';
import { appActions, appState } from 'state/app';
import { useSnapshot } from 'valtio';

import Header from './Header';

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
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
