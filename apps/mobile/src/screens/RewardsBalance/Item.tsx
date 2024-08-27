import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { defaultTheme } from 'utils/global';
import { useRewardDetail } from 'utils/hooks/reward';

interface Props {
	rewardInfoId: string;
	rewardId: string;
}

const Item: FC<Props> = ({ rewardInfoId, rewardId }) => {
	const { rewardInfo, reward } = useRewardDetail({
		rewardInfoId,
		redeemedRewardId: rewardId,
	});

	const calculatedPoints =
		(rewardInfo?.points || 0) * (1 - (rewardInfo?.discount || 0) / 100);

	return (
		<View style={styles.container}>
			<View style={styles.leftContainer}>
				<Text style={styles.title}>{rewardInfo?.name}</Text>
				<Text style={styles.date}>
					{new Date(reward?.updatedAt).toDateString()}
				</Text>
			</View>
			<Text style={styles.points}>-{calculatedPoints}</Text>
		</View>
	);
};

export default Item;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		paddingVertical: 24,
		marginHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: defaultTheme.textDark10,
	},
	leftContainer: {
		gap: 12,
		flex: 1,
	},
	title: {
		fontSize: 16,
		lineHeight: 20,
		fontWeight: '600',
		letterSpacing: -0.3,
		color: defaultTheme.textDark90,
	},
	date: {
		fontSize: 13,
		lineHeight: 15,
		color: defaultTheme.textDark70,
	},
	points: {
		width: 90,
		fontSize: 13,
		lineHeight: 15,
		fontWeight: '600',
		textAlign: 'right',
		color: defaultTheme.red,
	},
});
