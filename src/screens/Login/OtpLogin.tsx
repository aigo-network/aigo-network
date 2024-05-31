import { useEffect, useState } from 'react';
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
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
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { graphqlClient } from 'api/graphql';
import { setJWT } from 'api/jwt';
import Button from 'components/Button';
import LeftArrowIcon from 'components/icon/LeftArrowIcon';
import OtpInput from 'components/OtpInput';
import SafeContainer from 'components/SafeContainer';
import { appActions, appState } from 'state/app';
import { useSnapshot } from 'valtio';

import '@react-native-firebase/app-check';
import '@react-native-firebase/app-distribution';
import '@react-native-firebase/analytics';

const otpLength = 6;
const AnimatedView = Animated.createAnimatedComponent(View);

const OtpInputScreen = () => {
	const navigation = useNavigation();
	const [otp, setOtp] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [keyboardShown, setKeyboardShown] = useState(Keyboard.isVisible());
	const { phoneSignIn } = useSnapshot(appState);
	const paddingBot = useSharedValue(0);
	const disabled = otp.length !== otpLength;

	const btnPaddingBottom = useAnimatedStyle(
		() => ({ paddingBottom: paddingBot.value }),
		[paddingBot],
	);

	const handleOtpInput = (text: string) => {
		setOtp(text);
		if (error) {
			setError('');
		}
	};

	const confirmOtp = async () => {
		setLoading(true);
		try {
			const credential = await appState.phoneSignIn.confirmation?.confirm(otp);
			if (!credential) throw new Error('Failed to get user credential');
			appActions.updateOnboarding({
				phoneNumber: phoneSignIn.phoneNumber?.format('INTERNATIONAL'),
			});
			const jwt = await auth().currentUser?.getIdToken();
			if (jwt) setJWT(jwt);
			const { user } = await graphqlClient.getUserProfile();
			if (user?.completeOnboarding) {
				navigation.navigate('Home');
			} else {
				navigation.navigate('OnboardName');
			}
		} catch (error) {
			console.log('error', error);
			setError('Wrong code, please try again');
		}
		setLoading(false);
	};

	useEffect(() => {
		const showSubscription = Keyboard.addListener('keyboardWillShow', () => {
			paddingBot.value = withTiming(20);
			setKeyboardShown(true);
		});
		const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
			paddingBot.value = withTiming(0);
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
				<KeyboardAvoidingView
					style={styles.contentContainer}
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				>
					<View style={styles.upperContent}>
						<View style={styles.header}>
							<TouchableOpacity
								hitSlop={10}
								onPress={() => navigation.goBack()}
							>
								<LeftArrowIcon width={24} />
							</TouchableOpacity>
						</View>
						<View style={styles.content}>
							<Text style={styles.title}>Enter code</Text>
							<Text style={styles.subText}>
								We&apos;ve sent an SMS with a 6-digit activation code to your
								phone{' '}
								<Text style={styles.highlightPhoneNumber}>
									{phoneSignIn.phoneNumber?.format('INTERNATIONAL')}
								</Text>
							</Text>
						</View>
						<OtpInput
							style={styles.otpContainer}
							inputLength={otpLength}
							value={otp}
							onChangeText={handleOtpInput}
							errorMessage={error}
						/>
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
							style={[styles.btn, !disabled && styles.activeBtn]}
							onPress={confirmOtp}
							disabled={disabled}
							loading={loading}
						>
							<Text style={[styles.btnText, !disabled && styles.activeBtnText]}>
								Verify
							</Text>
						</Button>
					</AnimatedView>
				</KeyboardAvoidingView>
			</SafeContainer>
		</View>
	);
};

export default OtpInputScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#6740ff',
	},
	contentContainer: {
		flex: 1,
		justifyContent: 'space-between',
	},
	upperContent: {
		gap: 20,
	},
	header: {
		paddingHorizontal: 25,
		marginTop: 20,
		marginBottom: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	content: {
		marginHorizontal: 25,
	},
	title: {
		fontSize: 30,
		fontWeight: '700',
	},
	subText: {
		marginTop: 15,
		fontSize: 16,
	},
	highlightPhoneNumber: {
		fontWeight: '600',
	},
	otpContainer: {
		marginHorizontal: 25,
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
		backgroundColor: '#ebf7e6',
		paddingVertical: 15,
		borderRadius: 50,
	},
	activeBtn: {
		backgroundColor: '#a0fa82',
	},
	btnText: {
		fontFamily: 'Gabarito',
		fontWeight: '500',
		fontSize: 19,
		color: '#b1c2ab',
	},
	activeBtnText: {
		color: '#6740ff',
	},
});
