import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ChevronUp from '@aigo/components/icon/ChevronUp';
import Image from 'next/image';

import type { StoreOption } from './shared';

interface Props {
	style?: StyleProp<ViewStyle>;
	item: StoreOption;
	isActive?: boolean;
	onPress?: (item: StoreOption) => void;
}

export const DownloadButton: FC<Props> = ({ style, item, onPress }) => {
	return (
		<TouchableOpacity
			key={item.title}
			style={[styles.container, style]}
			onPress={() => onPress?.(item)}
		>
			<Image
				src={item.icon}
				alt="Store icon"
				width={item.size.width}
				height={item.size.height}
			/>
			<Text style={[styles.buttonText]}>{item.title}</Text>
			<View style={styles.icon}>
				<ChevronUp width={20} color="#999999" />
			</View>
		</TouchableOpacity>
	);
};

export default DownloadButton;

const styles = StyleSheet.create({
	container: {
		borderRadius: 16,
		alignItems: 'center',
		flexDirection: 'row',
		gap: 16,
		paddingHorizontal: 24,
		paddingVertical: 16,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.1)',
	},
	buttonText: {
		flex: 1,
		fontSize: 16,
		fontWeight: '500',
	},
	icon: {
		transform: [{ rotate: '90deg' }],
	},
});
