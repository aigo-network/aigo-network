import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const MobileInner: FC = () => {
	return (
		<View style={styles.container}>
			<Text>MobileInner</Text>
		</View>
	);
};

export default MobileInner;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
