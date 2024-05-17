import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import {
	Keyboard,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'components/Button';
import LeftArrowIcon from 'components/icon/LeftArrowIcon';
import Indicator from 'components/Indicator';
import SafeContainer from 'components/SafeContainer';

interface Props {
	disabled: boolean;
	onPress: () => void;
	children: ReactNode;
	title: string;
	subTitle: string;
	currentIndex: number;
	mainBtnText?: string;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const OnboardLayout: FC<Props> = ({
	disabled,
	onPress,
	children,
	title,
	subTitle,
	currentIndex,
	mainBtnText,
}) => {
	const navigation = useNavigation();
	const [keyboardShown, setKeyboardShown] = useState(Keyboard.isVisible());
	const totalOnboardingSteps = 2;
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
			setKeyboardShown(true);
		});
		const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
			paddingBot.value = withTiming(40);
			setKeyboardShown(false);
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
					<ProgressBar current={currentIndex} length={totalOnboardingSteps} />
				</View>
				<View style={styles.contentContainer}>
					<View style={styles.layoutHeader}>
						{navigation.canGoBack() && (
							<TouchableOpacity
								hitSlop={10}
								onPress={() => navigation.goBack()}
							>
								<LeftArrowIcon width={24} />
							</TouchableOpacity>
						)}
						<Indicator
							style={{ flex: 1 }}
							activeIndex={currentIndex}
							numberOfItems={3}
						/>
						{navigation.canGoBack() && <View style={{ width: 24 }} />}
					</View>
					<Text style={[styles.text, styles.title]}>{title}</Text>
					<Text style={[styles.text, styles.subTitle]}>{subTitle}</Text>
					{children}
				</View>
				{keyboardShown && (
					<View style={styles.keyboardLayer}>
						<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
							<View style={{ flex: 1 }} />
						</TouchableWithoutFeedback>
					</View>
				)}
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
	contentContainer: {
		flex: 1,
	},
	layoutHeader: {
		paddingHorizontal: 25,
		marginTop: 20,
		marginBottom: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
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
	keyboardLayer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	btnContainer: {
		paddingHorizontal: 25,
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
