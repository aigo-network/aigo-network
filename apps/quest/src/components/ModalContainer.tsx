import type { FC, ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import CloseIcon from '@aigo/components/icon/CloseIcon';

import { useIsMobile } from '@/hooks/responsive';
import { clashDisplay } from '@/utils/style';

interface Props {
	style?: StyleProp<ViewStyle>;
	contentContainerStyle?: StyleProp<ViewStyle>;
	title?: string;
	subTitle?: string | ReactNode;
	children?: ReactNode;
	onClose?: () => void;
}

export const ModalContainer: FC<Props> = ({
	style,
	contentContainerStyle,
	title = 'Title',
	subTitle = '',
	children,
	onClose,
}) => {
	const isMobile = useIsMobile();

	return (
		<Animated.View
			style={[styles.container, isMobile && styles.mobileContainer, style]}
			entering={FadeInDown}
		>
			<LinearGradient colors={['#1e2124', '#060a0d']}>
				<View style={styles.headerContainer}>
					<View style={styles.upperTitleContainer}>
						<View style={styles.titleContainer}>
							<Text style={styles.titleText}>{title}</Text>
						</View>
						<View style={styles.commandContainer}>
							<TouchableOpacity onPress={onClose}>
								<CloseIcon
									color="#9C9D9F"
									fillColor="rgba(255, 255, 255, 0.1)"
									width={30}
								/>
							</TouchableOpacity>
						</View>
					</View>
					<Text style={styles.subTitleText}>{subTitle}</Text>
				</View>
				<View style={[styles.contentContainer, contentContainerStyle]}>
					{children}
				</View>
			</LinearGradient>
		</Animated.View>
	);
};

export default ModalContainer;

const styles = StyleSheet.create({
	container: {
		borderRadius: 24,
		width: 420,
		overflow: 'hidden',
	},
	mobileContainer: {
		width: 340,
	},
	headerContainer: {
		paddingVertical: 18,
		paddingHorizontal: 24,
		gap: 4,
	},
	upperTitleContainer: {
		flexDirection: 'row',
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
		fontWeight: '500',
		fontFamily: clashDisplay.style.fontFamily,
		color: '#ffffff',
	},
	subTitleText: {
		fontSize: 16,
		lineHeight: 24,
		color: '#707174',
	},
	contentContainer: {
		borderTopWidth: StyleSheet.hairlineWidth,
		borderColor: 'rgba(255, 255, 255, 0.1)',
		padding: 24,
		paddingTop: 16,
	},
});
