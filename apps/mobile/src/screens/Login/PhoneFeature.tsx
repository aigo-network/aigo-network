import type { FC } from 'react';
import { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { getLocales } from 'react-native-localize';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import { Button } from '@aigo/components/Button';
import LeftArrowIcon from '@aigo/components/icon/LeftArrowIcon';
import KeyboardView from '@aigo/components/KeyboardView';
import SafeContainer from '@aigo/components/SafeContainer';
import crashlytics from '@react-native-firebase/crashlytics';
import { useNavigation } from '@react-navigation/native';
import type { CountryCode, PhoneNumber } from 'libphonenumber-js';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import type { CountryItem } from 'modals/CountrySelection/SelectionItem';
import { showCountrySelection } from 'modals/index';
import dialCode from 'utils/dialCode.json';
import { defaultTheme } from 'utils/global';

const AnimatedView = Animated.createAnimatedComponent(View);

type Props = {
	title: string;
	description: string;
	continueButton: string;
	signInWithPhoneNumber: (phoneNumber: PhoneNumber) => Promise<void> | void;
};

const PhoneLoginFeature: FC<Props> = ({
	title,
	description,
	continueButton,
	signInWithPhoneNumber,
}) => {
	const navigation = useNavigation();
	const paddingBot = useSharedValue(0);
	const [loading, setLoading] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState('');
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
		else crashlytics().log('parsed phone number empty, something went wrong');
		setLoading(false);
	};

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
				<KeyboardView
					style={styles.contentContainer}
					aboveMaskComponent={
						<AnimatedView style={[styles.btnContainer, btnPaddingBottom]}>
							<Button
								style={[styles.btn, isPhoneValid && styles.activeBtn]}
								onPress={signIn}
								disabled={!isPhoneValid}
								loading={loading}
								loadingColor={defaultTheme.textDark90}
							>
								<Text style={styles.btnText}>{continueButton}</Text>
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
							<Text style={styles.subText}>{description}</Text>
							<View style={styles.countryContainer}>
								<TouchableOpacity
									style={styles.countryBtn}
									onPress={() => showCountrySelection(handleChangeCountry)}
								>
									<Text style={{ fontSize: 24 }}>{countryInfo.emoji}</Text>
									<Text
										style={{ fontSize: 17, color: defaultTheme.textDark90 }}
									>
										{countryInfo.name}
									</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.phoneNumber}>
								<View style={styles.dialCodeBorder}>
									<Text style={styles.dialCode}>{countryInfo.dial_code}</Text>
								</View>
								<TextInput
									style={styles.phoneInput}
									placeholder="0 00 00 00 00"
									placeholderTextColor={defaultTheme.textDark30}
									inputMode="tel"
									keyboardType="number-pad"
									autoFocus
									onChangeText={setPhoneNumber}
									value={formattedPhoneNumber || phoneNumber}
								/>
							</View>
						</View>
					</View>
				</KeyboardView>
			</SafeContainer>
		</View>
	);
};

export default PhoneLoginFeature;

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
		color: defaultTheme.textDark90,
	},
	subText: {
		marginTop: 15,
		fontSize: 16,
		color: defaultTheme.textDark70,
	},
	countryContainer: {
		marginTop: 50,
		borderTopWidth: 1,
		borderTopColor: defaultTheme.textDark30,
		borderBottomWidth: 1,
		borderBottomColor: defaultTheme.textDark30,
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
		borderBottomColor: defaultTheme.textDark30,
		flexDirection: 'row',
	},
	dialCodeBorder: {
		borderRightWidth: 1,
		borderRightColor: defaultTheme.textDark30,
		marginVertical: 10,
		justifyContent: 'center',
	},
	dialCode: {
		marginRight: 15,
		fontSize: 17,
		color: defaultTheme.textDark90,
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
