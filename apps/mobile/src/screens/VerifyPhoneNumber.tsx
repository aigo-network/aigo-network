import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import type { PhoneNumber } from 'libphonenumber-js';
import { appState } from 'state/app';
import { useSnapshot } from 'valtio';

import PhoneFeature from './Login/PhoneFeature';
import { setPhoneAuthConfirmation } from './shared';

export const VerifyPhoneNumberScreen = () => {
	const navigation = useNavigation();
	const { content } = useSnapshot(appState);
	const { title, subText, continueButton } = content.screens.phoneNumberVerify;

	const signInWithPhoneNumber = async (phoneNumber: PhoneNumber) => {
		try {
			const confirmation = await auth().verifyPhoneNumber(phoneNumber.number);
			setPhoneAuthConfirmation(confirmation);
			navigation.navigate('VerifyOTP');
		} catch (error) {
			console.log('Error phone sign in:', error);
		}
	};

	return (
		<PhoneFeature
			title={title}
			description={subText}
			continueButton={continueButton}
			signInWithPhoneNumber={signInWithPhoneNumber}
		/>
	);
};

export default VerifyPhoneNumberScreen;
