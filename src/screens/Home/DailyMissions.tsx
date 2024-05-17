import { StyleSheet, Text, View } from 'react-native';

import { sharedStyles } from './shared';

export const DailyMissions = () => {
	return (
		<View style={[sharedStyles.container, styles.container]}>
			<Text style={sharedStyles.title}>Daily Missions</Text>
		</View>
	);
};

export default DailyMissions;

const styles = StyleSheet.create({
	container: {},
	title: {},
});
