import type { FC } from 'react';
import { useEffect, useState } from 'react';
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { getLocales } from 'react-native-localize';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'components/Button';
import LeftArrowIcon from 'components/icon/LeftArrowIcon';
import SafeContainer from 'components/SafeContainer';
import type { CountryCode, PhoneNumber } from 'libphonenumber-js';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import type { CountryItem } from 'modals/CountrySelection/SelectionItem';
import { showCountrySelection } from 'modals/index';
import dialCode from 'utils/dialCode.json';

const AnimatedView = Animated.createAnimatedComponent(View);

type Props = {
	title: string;
	description: string;
	signInWithPhoneNumber: (phoneNumber: PhoneNumber) => Promise<void> | void;
};

const PhoneLoginFeature: FC<Props> = ({
	title,
	description,
	signInWithPhoneNumber,
}) => {
	const navigation = useNavigation();
	const paddingBot = useSharedValue(0);
	const [loading, setLoading] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState('');
	const [keyboardShown, setKeyboardShown] = useState(Keyboard.isVisible());
	const [countryInfo, setCountryInfo] = useState<CountryItem>({
		name: '',
		dial_code: '',
		emoji: '',
		code: '',
	});
	const parsedPhoneNumber = parsePhoneNumberFromString(
		phoneNumber,
		countryInfo.code as CountryCode,
	);
	const isPhoneValid = parsedPhoneNumber?.isValid();
	const formattedPhoneNumber = parsedPhoneNumber
		?.format('INTERNATIONAL')
		.replace(`${countryInfo.dial_code} `, '');

	const btnPaddingBottom = useAnimatedStyle(
		() => ({ paddingBottom: paddingBot.value }),
		[paddingBot],
	);

	const handleChangeCountry = (item: CountryItem) => {
		setCountryInfo(item);
	};

	const signIn = async () => {
		setLoading(true);
		if (parsedPhoneNumber) await signInWithPhoneNumber(parsedPhoneNumber);
		else console.log('parsed phone number empty, something went wrong');
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

	useEffect(() => {
		const [{ countryCode }] = getLocales();
		const country = dialCode.find((country) => country.code === countryCode);
		if (country) {
			setCountryInfo(country);
		}
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
							<Text style={styles.title}>{title}</Text>
							<Text style={styles.subText}>{description}</Text>
							<View style={styles.countryContainer}>
								<TouchableOpacity
									style={styles.countryBtn}
									onPress={() => showCountrySelection(handleChangeCountry)}
								>
									<Text style={{ fontSize: 24 }}>{countryInfo.emoji}</Text>
									<Text style={{ fontSize: 17 }}>{countryInfo.name}</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.phoneNumber}>
								<View style={styles.dialCodeBorder}>
									<Text style={styles.dialCode}>{countryInfo.dial_code}</Text>
								</View>
								<TextInput
									style={styles.phoneInput}
									placeholder="0 00 00 00 00"
									placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
									inputMode="tel"
									keyboardType="number-pad"
									autoFocus
									onChangeText={setPhoneNumber}
									value={formattedPhoneNumber || phoneNumber}
								/>
							</View>
						</View>
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
							style={[styles.btn, isPhoneValid && styles.activeBtn]}
							onPress={signIn}
							disabled={!isPhoneValid}
							loading={loading}
						>
							<Text
								style={[styles.btnText, isPhoneValid && styles.activeBtnText]}
							>
								Continue
							</Text>
						</Button>
					</AnimatedView>
				</KeyboardAvoidingView>
			</SafeContainer>
		</View>
	);
};

export default PhoneLoginFeature;

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
		gap: 30,
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
	countryContainer: {
		marginTop: 50,
		borderTopWidth: 1,
		borderTopColor: '#afb2ff',
		borderBottomWidth: 1,
		borderBottomColor: '#afb2ff',
	},
	countryBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		height: 60,
	},
	phoneNumber: {
		height: 60,
		borderBottomWidth: 1,
		borderBottomColor: '#afb2ff',
		flexDirection: 'row',
	},
	dialCodeBorder: {
		borderRightWidth: 1,
		borderRightColor: '#fff',
		marginVertical: 10,
		justifyContent: 'center',
	},
	dialCode: {
		marginRight: 15,
		fontSize: 17,
	},
	phoneInput: {
		marginLeft: 15,
		fontSize: 17,
		flex: 1,
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
