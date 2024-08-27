import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { RewardInfo } from '@aigo/api/sdk';
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { useSnapshot } from 'valtio';

interface Props {
	rewardInfo: RewardInfo;
	isRedeemed?: boolean;
}

const PointsAndDate: FC<Props> = ({ isRedeemed = false, rewardInfo }) => {
	const { content } = useSnapshot(appState);
	const { expired, points } = content.screens.reward.rewardsDetail;

	return (
		<View style={styles.container}>
			<View style={styles.tagContainer}>
				<Text style={styles.tagTitle}>{points}</Text>
				<View style={styles.pointContainer}>
					<Text
						style={[
							styles.point,
							isRedeemed && { color: defaultTheme.textDark90 },
						]}
					>
						{rewardInfo?.discount
							? (rewardInfo?.points || 0) * (1 - rewardInfo.discount / 100)
							: rewardInfo?.points}{' '}
						GO
					</Text>
					{!!rewardInfo?.discount && !isRedeemed && (
						<Text style={styles.discount}>{rewardInfo?.points}</Text>
					)}
				</View>
			</View>
			<View style={styles.tagContainer}>
				<Text style={styles.tagTitle}>{expired}</Text>
				<Text style={styles.date}>
					{new Date(rewardInfo?.expiredDate).toLocaleDateString()}
				</Text>
			</View>
		</View>
	);
};

export default PointsAndDate;

const styles = StyleSheet.create({
	container: {
		marginTop: 16,
		flexDirection: 'row',
		gap: 14,
	},
	tagContainer: {
		flex: 1,
		padding: 12,
		gap: 8,
		borderRadius: 20,
		backgroundColor: defaultTheme.gray10,
	},
	tagTitle: {
		fontSize: 13,
		lineHeight: 15,
		letterSpacing: -0.3,
		color: defaultTheme.textDark80,
	},
	pointContainer: {
		flexDirection: 'row',
		alignItems: 'baseline',
		gap: 4,
	},
	point: {
		lineHeight: 16,
		fontWeight: '700',
		letterSpacing: -0.3,
		color: defaultTheme.cta100,
	},
	discount: {
		fontSize: 12,
		lineHeight: 14,
		letterSpacing: -0.3,
		color: defaultTheme.textDark30,
		textDecorationLine: 'line-through',
	},
	date: {
		lineHeight: 16,
		fontWeight: '500',
		letterSpacing: -0.3,
		color: defaultTheme.textDark90,
	},
});
