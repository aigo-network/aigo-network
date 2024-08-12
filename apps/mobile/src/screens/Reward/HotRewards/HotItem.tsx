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
			<Text style={{ color: defaultTheme.textDark90 }}>{index}</Text>
		</View>
	);
};

export default HotItem;

const styles = StyleSheet.create({
	container: {
		width: itemWidth,
		gap: 8,
	},
	image: {
		width: itemWidth,
		height: 180,
		borderRadius: 20,
	},
});
