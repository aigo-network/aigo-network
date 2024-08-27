import type { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { RewardInfo } from '@aigo/api/sdk';
import { useNavigation } from '@react-navigation/native';
import { defaultTheme } from 'utils/global';
import { calculatePoints } from 'utils/reward';

export const itemWidth = 300;

interface Props {
	rewardInfo: RewardInfo;
}

const HotItem: FC<Props> = ({ rewardInfo }) => {
	const { navigate } = useNavigation();
	const handlePress = () => {
		navigate('RewardDetail', { rewardInfoId: rewardInfo?.id });
	};
	const calculatedPoints = calculatePoints(
		rewardInfo?.points || 0,
		rewardInfo?.discount || 0,
	);

	return (
		<TouchableOpacity onPress={handlePress}>
			<View style={styles.container}>
				<Image
					source={{ uri: rewardInfo?.images?.[0] || '' }}
					style={styles.image}
				/>
				<Text style={styles.name}>{rewardInfo?.name}</Text>
				<Text style={styles.points}>{calculatedPoints} GO</Text>
			</View>
		</TouchableOpacity>
	);
};

export default HotItem;

const styles = StyleSheet.create({
	container: {
		width: itemWidth,
	},
	image: {
		width: itemWidth,
		height: 180,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: defaultTheme.gray20,
	},
	name: {
		marginTop: 8,
		fontSize: 16,
		lineHeight: 24,
		letterSpacing: -0.3,
		fontWeight: '500',
		color: defaultTheme.textDark90,
	},
	points: {
		marginTop: 4,
		fontSize: 13,
		lineHeight: 15,
		fontWeight: '500',
		letterSpacing: -0.3,
		color: defaultTheme.cta100,
	},
});
