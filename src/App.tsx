import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const AppContainer: FC = () => {
	return (
		<View style={styles.container}>
			<Text>AppContainer</Text>
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
