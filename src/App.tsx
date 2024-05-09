import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { appState, appActions } from 'state/app';
import { useSnapshot } from 'valtio';
import AnimatedBox from 'components/AnimatedBox';

export const AppContainer: FC = () => {
	const { counter } = useSnapshot(appState)

	return (
		<View style={styles.container}>
			<Text onPress={() => appActions.increaseCounter()}>AppContainer {counter}</Text>
			<AnimatedBox size={100} />
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
