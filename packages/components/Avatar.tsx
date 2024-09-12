import type { FC } from 'react';
import type { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native';

interface Props {
	style?: StyleProp<ViewStyle>;
	imageStyle?: StyleProp<ImageStyle>;
	thumbTextStyle?: StyleProp<TextStyle>;
	displayTextStyle?: StyleProp<TextStyle>;
	size?: number;
	imageUrl?: string | null;
	displayText?: string | null;
	withName?: boolean;
}

export const Avatar: FC<Props> = ({
	style,
	imageStyle,
	thumbTextStyle,
	displayTextStyle,
	size = 32,
	imageUrl,
	displayText = '?',
	withName,
}) => {
	const thumbContainer = {
		width: size,
		height: size,
		borderRadius: size / 2,
		backgroundColor: '#DEDEDE',
	};

	return (
		<View style={[styles.container, style]}>
			{imageUrl ? (
				<Image
					style={[thumbContainer, imageStyle]}
					source={{ uri: imageUrl }}
				/>
			) : (
				<View style={thumbContainer}>
					<Text style={[styles.thumbText, thumbTextStyle]}>
						{displayText?.substring(0, 1)}
					</Text>
				</View>
			)}
			{withName && (
				<Text numberOfLines={1} style={[styles.displayText, displayTextStyle]}>
					{displayText}
				</Text>
			)}
		</View>
	);
};

export default Avatar;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
	},
	thumbText: {
		textAlign: 'center',
		fontSize: 32,
	},
	displayText: {
		fontSize: 16,
	},
});
