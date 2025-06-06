import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import { useNavigation } from '@react-navigation/native';
import type { PhoneNumber } from 'libphonenumber-js';
import { appActions, appState } from 'state/app';
import { useSnapshot } from 'valtio';

import PhoneFeature from './PhoneFeature';
import { setConfirmation } from './shared';

const PhoneLoginScreen = () => {
	const navigation = useNavigation();
	const { content } = useSnapshot(appState);
	const { login, subText, continueButton } =
		content.screens.logIn.phoneNumberLogin;
	const signInWithPhoneNumber = async (phoneNumber: PhoneNumber) => {
		try {
			const confirmation = await auth().signInWithPhoneNumber(
				phoneNumber.number,
			);
			if (confirmation) setConfirmation(confirmation);

			appActions.updatePhoneSignIn(phoneNumber);
			navigation.navigate('OtpInput');
			analytics().logLogin({ method: 'Phone' });
		} catch (error) {
			crashlytics().recordError(error as Error);
			console.log('Error phone sign in:', error);
		}
	};

	return (
		<PhoneFeature
			title={login}
			description={subText}
			continueButton={continueButton}
			signInWithPhoneNumber={signInWithPhoneNumber}
		/>
	);
};

export default PhoneLoginScreen;
