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
import { Button } from '@aigo/components/Button';
import LeftArrowIcon from '@aigo/components/icon/LeftArrowIcon';
import SafeContainer from '@aigo/components/SafeContainer';
import { useNavigation } from '@react-navigation/native';
import Indicator from 'components/Indicator';
import { defaultTheme } from 'utils/global';

interface Props {
	disabled: boolean;
	onPress: () => Promise<void> | void;
	children: ReactNode;
	title: string;
	subTitle: string;
	currentIndex: number;
	mainBtnText: string;
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
	const [loading, setLoading] = useState(false);
	const [keyboardShown, setKeyboardShown] = useState(Keyboard.isVisible());
	const paddingBot = useSharedValue(40);
	const btnPaddingBottom = useAnimatedStyle(
		() => ({ paddingBottom: paddingBot.value }),
		[paddingBot],
	);

	const handlePressContinue = async () => {
		setLoading(true);
		await onPress();
		setLoading(false);
	};

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
				<View style={styles.contentContainer}>
					<View style={styles.layoutHeader}>
						{navigation.canGoBack() && currentIndex > 1 && (
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
						style={[styles.btn, disabled && styles.disabledBtn]}
						onPress={handlePressContinue}
						disabled={disabled}
						loading={loading}
					>
						<Text style={styles.btnText}>{mainBtnText}</Text>
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
		backgroundColor: defaultTheme.bgLight,
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
	text: {
		textAlign: 'center',
	},
	title: {
		fontSize: 30,
		fontWeight: '500',
		marginHorizontal: 25,
		color: defaultTheme.textDark90,
	},
	subTitle: {
		marginTop: 10,
		fontSize: 16,
		marginHorizontal: 25,
		color: defaultTheme.textDark70,
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
		backgroundColor: defaultTheme.textDark90,
		paddingVertical: 15,
		borderRadius: 50,
	},
	disabledBtn: {
		opacity: 0.1,
	},
	btnText: {
		fontWeight: '500',
		fontSize: 16,
		lineHeight: 24,
		color: defaultTheme.textLight,
	},
});
