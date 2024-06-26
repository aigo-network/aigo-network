import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import MissionTag from './MissionTag';

import BoardLayout from '@/components/BoardLayout';

type Props = {
	isMobile?: boolean;
};

const MissionBoard: FC<Props> = ({ isMobile }) => {
	return (
		<BoardLayout
			style={styles.container}
			contentContainerStyle={[
				styles.contentContainer,
				isMobile && styles.mobileContainer,
			]}
			title="Quests"
			subTitle="COMPLETE ALL THE TASKS BELOW TO GAIN MORE GO POINTS"
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
		flex: 2,
		minWidth: 320,
	},
	mobileContainer: {
		minWidth: 0,
	},
	contentContainer: {
		flex: 1,
		paddingHorizontal: 24,
		paddingBottom: 24,
	},
	missionGroup: {
		gap: 16,
		marginTop: 32,
	},
});
