import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import type { DownloadOption } from './shared';

interface Props {
	style?: StyleProp<ViewStyle>;
	item: DownloadOption;
	isActive?: boolean;
	onPress?: (item: DownloadOption) => void;
}

export const DownloadButton: FC<Props> = ({
	style,
	item,
	onPress,
	isActive,
}) => {
	return (
		<TouchableOpacity
			key={item.title}
			style={[styles.container, isActive && styles.activeContainer, style]}
			onPress={() => onPress?.(item)}
		>
			<Text style={[styles.buttonText, !isActive && styles.inactiveText]}>
				{item.title}
			</Text>
		</TouchableOpacity>
	);
};

export default DownloadButton;

const styles = StyleSheet.create({
	container: {
		height: 48,
		borderRadius: 12,
		backgroundColor: '#f2f2f2',
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 14,
	},
	activeContainer: {
		backgroundColor: '#81ddfb',
	},
	buttonText: {
		flex: 1,
		fontSize: 16,
		textAlign: 'center',
		fontWeight: '500',
	},
	inactiveText: {
		color: '#000',
	},
});
