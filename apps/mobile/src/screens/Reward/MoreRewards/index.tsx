import { useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { useRewardClassification } from 'utils/hooks/reward';
import { useSnapshot } from 'valtio';

import Item from './Item';

const MoreRewards = () => {
	const [containerWidth, setContainerWidth] = useState(0);
	const { content } = useSnapshot(appState);
	const handleLayoutChange = ({ nativeEvent }: LayoutChangeEvent) => {
		setContainerWidth(nativeEvent.layout.width);
	};
	const { activeRewards } = useRewardClassification();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				{content.screens.reward.moreRewards.title}
			</Text>
			<View style={styles.contentContainer} onLayout={handleLayoutChange}>
				{activeRewards?.map((reward) => {
					return (
						<Item
							key={reward.id}
							rewardId={reward.id}
							containerWidth={containerWidth}
						/>
					);
				})}
			</View>
		</View>
	);
};

export default MoreRewards;

const styles = StyleSheet.create({
	container: {
		gap: 12,
		marginTop: 40,
	},
	title: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: '600',
		letterSpacing: -0.3,
		color: defaultTheme.textDark90,
		paddingLeft: 16,
	},
	contentContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginHorizontal: 4,
	},
});
