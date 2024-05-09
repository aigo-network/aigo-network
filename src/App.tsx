import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { appState, appActions } from 'state/app';
import { useSnapshot } from 'valtio';

export const AppContainer: FC = () => {
	const { counter } = useSnapshot(appState)

	return (
		<View style={styles.container}>
			<Text onPress={() => appActions.increaseCounter()}>AppContainer {counter}</Text>
		</View>
	);
};

export default AppContainer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
});
