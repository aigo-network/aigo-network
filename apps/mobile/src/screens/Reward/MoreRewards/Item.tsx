import type { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import type { RewardInfo } from '@aigo/api/sdk';
import { useNavigation } from '@react-navigation/native';
import { rewardState } from 'state/reward';
import { defaultTheme } from 'utils/global';
import { useSnapshot } from 'valtio';

const padding = 12;

interface Props {
	containerWidth: number;
	rewardId: RewardInfo['id'];
}

const Item: FC<Props> = ({ containerWidth, rewardId }) => {
	const { navigate } = useNavigation();
	const { rewards } = useSnapshot(rewardState);
	const reward = rewards?.[rewardId || ''];
	const imageSize = containerWidth / 2 - 2 * padding;

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => navigate('RewardDetail', { rewardId })}>
				<View style={styles.innerContainer}>
					<Image
						style={styles.image}
						width={imageSize}
						height={imageSize}
						resizeMode="cover"
						source={{ uri: reward?.images?.[0] || '' }}
					/>
					<View>
						<Text style={styles.brand}>{reward?.brand}</Text>
						<Text style={styles.name} numberOfLines={2}>
							{reward?.name}
						</Text>
						<Text style={styles.points}>
							{reward?.discount
								? (reward?.points || 0) * (1 - reward.discount / 100)
								: reward?.points}{' '}
							GO
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default Item;

const styles = StyleSheet.create({
	container: {
		width: '50%',
		padding: 12,
	},
	innerContainer: {
		gap: 12,
	},
	image: {
		borderRadius: 12,
		borderWidth: 1,
		borderColor: defaultTheme.gray20,
	},
	brand: {
		fontSize: 12,
		lineHeight: 14,
		letterSpacing: -0.3,
		color: defaultTheme.textDark70,
	},
	name: {
		marginTop: 4,
		fontWeight: '600',
		lineHeight: 20,
		letterSpacing: -0.3,
		color: defaultTheme.textDark90,
	},
	points: {
		marginTop: 8,
		fontSize: 13,
		lineHeight: 15,
		fontWeight: '700',
		letterSpacing: -0.3,
		color: defaultTheme.cta100,
	},
});
