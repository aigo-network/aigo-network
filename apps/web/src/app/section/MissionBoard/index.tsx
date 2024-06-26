import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import MissionTag from './MissionTag';

import BoardLayout from '@/components/BoardLayout';

const MissionBoard: FC = () => {
	return (
		<BoardLayout
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
			title="Quests"
			subTitle={'Complete all the tasks below to gain more go points'.toUpperCase()}
		>
			<View style={styles.missionGroup}>
				<MissionTag />
			</View>
		</BoardLayout>
	);
};

export default MissionBoard;

const styles = StyleSheet.create({
	container: {
		minWidth: 450,
		flex: 1,
	},
	contentContainer: {
		height: '100%',
	},
	missionGroup: {
		gap: 16,
		marginTop: 32,
		paddingHorizontal: 24,
	},
});
