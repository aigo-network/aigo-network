import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { useSnapshot } from 'valtio';

interface Props {
	rewardDescription?: string;
	termAndConditions?: string;
}

const Description: FC<Props> = ({ rewardDescription, termAndConditions }) => {
	const { content } = useSnapshot(appState);

	return (
		<View style={styles.container}>
			<Text style={styles.normalText}>{rewardDescription}</Text>

			<Text style={[styles.normalText, styles.highlightText]}>
				{'\n'}
				{content.screens.reward.rewardsDetail.termAndCondition}
			</Text>

			<Text style={styles.normalText}>{termAndConditions}</Text>
		</View>
	);
};

export default Description;

const styles = StyleSheet.create({
	container: {
		marginTop: 24,
	},
	normalText: {
		marginHorizontal: 16,
		lineHeight: 24,
		letterSpacing: -0.3,
		color: defaultTheme.textDark90,
	},
	highlightText: {
		fontWeight: '700',
	},
});
