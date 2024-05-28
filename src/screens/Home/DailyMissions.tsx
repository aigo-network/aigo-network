import { StyleSheet, Text, View } from 'react-native';
import { appState } from 'state/app';
import { useSnapshot } from 'valtio';

import { sharedStyles } from './shared';

export const DailyMissions = () => {
	const { content } = useSnapshot(appState);
	const homeContent = content.screens.home;

	return (
		<View style={[sharedStyles.container, styles.container]}>
			<Text style={sharedStyles.title}>
				{homeContent.dailyCheckInSection.title}
			</Text>
		</View>
	);
};

export default DailyMissions;

const styles = StyleSheet.create({
	container: {},
	title: {},
});
