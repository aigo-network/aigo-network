import type { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { defaultTheme } from 'utils/global';

interface Props {
	brandImage: string;
	brand: string;
	name: string;
}

const brandImageSize = 48;

const Title: FC<Props> = ({ brandImage, brand, name }) => {
	return (
		<View style={styles.brandContainer}>
			<Image
				width={brandImageSize}
				height={brandImageSize}
				resizeMode="contain"
				source={{ uri: brandImage || '' }}
			/>
			<View style={{ flex: 1 }}>
				<Text style={styles.brand}>{brand}</Text>
				<View>
					<Text style={styles.rewardName}>{name}</Text>
				</View>
			</View>
		</View>
	);
};

export default Title;

const styles = StyleSheet.create({
	brandContainer: {
		flexDirection: 'row',
		gap: 12,
		alignItems: 'center',
	},
	brand: {
		fontSize: 13,
		lineHeight: 24,
		letterSpacing: -0.3,
		color: defaultTheme.textDark60,
	},
	rewardName: {
		fontSize: 18,
		lineHeight: 24,
		fontWeight: '600',
		letterSpacing: -0.3,
		color: defaultTheme.textDark90,
	},
});
