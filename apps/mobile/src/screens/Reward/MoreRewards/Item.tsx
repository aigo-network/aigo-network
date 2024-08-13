import type { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { defaultTheme } from 'utils/global';

const padding = 12;

interface Props {
	containerWidth: number;
}

const Item: FC<Props> = ({ containerWidth }) => {
	const { navigate } = useNavigation();
	const imageSize = containerWidth / 2 - 2 * padding;

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => navigate('RewardDetail')}>
				<View style={styles.innerContainer}>
					<Image
						style={styles.image}
						width={imageSize}
						height={imageSize}
						resizeMode="cover"
						source={{ uri: 'https://picsum.photos/200/200' }}
					/>
					<View>
						<Text style={styles.brand}>Brands</Text>
						<Text style={styles.name}>
							Lorem ipsum dolor sit amet consectetur.
						</Text>
						<Text style={styles.points}>40 GO</Text>
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
