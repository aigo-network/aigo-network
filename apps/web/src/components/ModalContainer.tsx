import type { FC, ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import CloseIcon from '@aigo/components/icon/CloseIcon';

interface Props {
	style?: StyleProp<ViewStyle>;
	contentContainerStyle?: StyleProp<ViewStyle>;
	title?: string;
	children?: ReactNode;
	onClose?: () => void;
}

export const ModalContainer: FC<Props> = ({
	style,
	contentContainerStyle,
	title = 'Title',
	children,
	onClose,
}) => {
	return (
		<Animated.View style={[styles.container, style]} entering={FadeInDown}>
			<View style={styles.headerContainer}>
				<View style={styles.titleContainer}>
					<Text style={styles.titleText}>{title}</Text>
				</View>
				<View style={styles.commandContainer}>
					<TouchableOpacity onPress={onClose}>
						<CloseIcon width={30} />
					</TouchableOpacity>
				</View>
			</View>
			<View style={[styles.contentContainer, contentContainerStyle]}>
				{children}
			</View>
		</Animated.View>
	);
};

export default ModalContainer;

const styles = StyleSheet.create({
	container: {
		borderRadius: 24,
		width: 340,
		backgroundColor: '#FFFFFF',
	},
	headerContainer: {
		flexDirection: 'row',
		paddingVertical: 18,
		paddingHorizontal: 24,
		alignItems: 'center',
	},
	titleContainer: {
		flex: 1,
	},
	commandContainer: {
		flexDirection: 'row',
	},
	titleText: {
		fontSize: 24,
		color: '#222222',
	},
	contentContainer: {
		borderTopWidth: StyleSheet.hairlineWidth,
		borderColor: '#EFEFEF',
		padding: 24,
		paddingTop: 16,
	},
});
