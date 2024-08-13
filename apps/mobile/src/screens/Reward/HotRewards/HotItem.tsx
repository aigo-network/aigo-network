import type { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { defaultTheme } from 'utils/global';

export const itemWidth = 300;

interface Props {
	index: number;
}

const HotItem: FC<Props> = ({ index }) => {
	return (
		<View style={styles.container}>
			<Image
				source={{ uri: 'https://picsum.photos/300/180' }}
				style={styles.image}
			/>
			<Text style={styles.name}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi.
			</Text>
			<Text style={styles.points}>{index} 40 GO</Text>
		</View>
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
