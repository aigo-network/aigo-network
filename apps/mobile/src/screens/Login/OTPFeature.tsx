import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import Button from '@aigo/components/Button';
import LeftArrowIcon from '@aigo/components/icon/LeftArrowIcon';
import KeyboardView from '@aigo/components/KeyboardView';
import SafeContainer from '@aigo/components/SafeContainer';
import { useNavigation } from '@react-navigation/native';
import OtpInput from 'components/OtpInput';
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { useSnapshot } from 'valtio';

const otpLength = 6;
const AnimatedView = Animated.createAnimatedComponent(View);

type Props = {
	title: string;
	code?: string;
	description: string;
	verifyButton: string;
	confirmOTP: (code: string) => Promise<void> | void;
};

const OTPFeature: FC<Props> = ({
	code = '',
	title,
	description,
	verifyButton,
	confirmOTP,
}) => {
	const navigation = useNavigation();
	const [otp, setOtp] = useState(code);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
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

	const wrappedConfirmOTP = async () => {
		setLoading(true);
		try {
			await confirmOTP(otp);
		} catch (error) {
			setError((error as Error).message);
		}
		setLoading(false);
	};

	useEffect(() => {
		setOtp(code);
	}, [code]);

	return (
		<View style={styles.container}>
			<SafeContainer>
				<KeyboardView
					style={styles.contentContainer}
					aboveMaskComponent={
						<AnimatedView style={[styles.btnContainer, btnPaddingBottom]}>
							<Button
								style={[styles.btn, !disabled && styles.activeBtn]}
								onPress={wrappedConfirmOTP}
								disabled={disabled}
								loading={loading}
								loadingColor={defaultTheme.textDark90}
							>
								<Text style={styles.btnText}>{verifyButton}</Text>
							</Button>
						</AnimatedView>
					}
				>
					<View style={styles.upperContent}>
						<View style={styles.header}>
							<TouchableOpacity
								hitSlop={10}
								onPress={() => navigation.goBack()}
							>
								<LeftArrowIcon width={24} color={defaultTheme.textDark90} />
							</TouchableOpacity>
						</View>
						<View style={styles.content}>
							<Text style={styles.title}>{title}</Text>
							<Text style={styles.subText}>
								{description}{' '}
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
				</KeyboardView>
			</SafeContainer>
		</View>
	);
};

export default OTPFeature;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.bgLight,
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
		color: defaultTheme.textDark90,
	},
	subText: {
		marginTop: 15,
		fontSize: 16,
		color: defaultTheme.textDark70,
	},
	highlightPhoneNumber: {
		fontWeight: '600',
		color: defaultTheme.textDark70,
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
		backgroundColor: defaultTheme.textDark90,
		paddingVertical: 15,
		borderRadius: 50,
		opacity: 0.1,
	},
	activeBtn: {
		opacity: 1,
	},
	btnText: {
		fontWeight: '500',
		fontSize: 16,
		lineHeight: 24,
		color: defaultTheme.textLight,
	},
});
