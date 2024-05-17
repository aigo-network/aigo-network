import type { FC, ReactNode } from 'react';
import { useEffect } from 'react';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

import { Button } from './Button';
import ProgressBar from './Progress';
import SafeContainer from './SafeContainer';

interface Props {
	disabled: boolean;
	onPress: () => void;
	children: ReactNode;
	title: string;
	subTitle: string;
	mainBtnText?: string;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const OnboardLayout: FC<Props> = ({
	disabled,
	onPress,
	children,
	title,
	subTitle,
	mainBtnText,
}) => {
	const paddingBot = useSharedValue(40);
	const btnBackgroundColor = {
		backgroundColor: disabled ? '#ebf7e6' : '#a0fa82',
	};
	const btnTextColor = { color: disabled ? '#b1c2ab' : '#6740ff' };
	const btnPaddingBottom = useAnimatedStyle(
		() => ({ paddingBottom: paddingBot.value }),
		[paddingBot],
	);

	useEffect(() => {
		const showSubscription = Keyboard.addListener('keyboardWillShow', () => {
			paddingBot.value = withTiming(0);
		});
		const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
			paddingBot.value = withTiming(40);
		});

		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);

	return (
		<View style={styles.container}>
			<SafeContainer>
				<View style={styles.progressContainer}>
					<ProgressBar current={1} length={4} />
				</View>
				<View style={styles.contentContainer}>
					<Text style={[styles.text, styles.title]}>{title}</Text>
					<Text style={[styles.text, styles.subTitle]}>{subTitle}</Text>
					{children}
				</View>
				<AnimatedView style={[styles.btnContainer, btnPaddingBottom]}>
					<Button
						style={[styles.btn, btnBackgroundColor]}
						onPress={onPress}
						disabled={disabled}
					>
						<Text style={[styles.btnText, btnTextColor]}>
							{mainBtnText || 'Continue'}
						</Text>
					</Button>
				</AnimatedView>
			</SafeContainer>
		</View>
	);
};

export default OnboardLayout;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#6740ff',
	},
	progressContainer: {
		alignItems: 'center',
		marginTop: 20,
		marginBottom: 40,
	},
	text: {
		fontFamily: 'Gabarito',
		textAlign: 'center',
	},
	title: {
		fontSize: 30,
		fontWeight: '500',
	},
	subTitle: {
		marginTop: 10,
		fontSize: 16,
	},
	contentContainer: {
		flex: 1,
	},
	btnContainer: {
		paddingHorizontal: 40,
		justifyContent: 'flex-end',
	},
	btn: {
		backgroundColor: '#a0fa82',
		paddingVertical: 15,
		borderRadius: 50,
	},
	btnText: {
		fontFamily: 'Gabarito',
		fontWeight: '500',
		fontSize: 19,
	},
});
