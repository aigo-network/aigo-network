import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import type { PhoneNumber } from 'libphonenumber-js';

import PhoneFeature from './Login/PhoneFeature';
import { setPhoneAuthConfirmation } from './shared';

export const VerifyPhoneNumberScreen = () => {
	const navigation = useNavigation();

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
			title="Verify Phone number"
			description="Please confirm your country code and enter your phone number."
			signInWithPhoneNumber={signInWithPhoneNumber}
		/>
	);
};

export default VerifyPhoneNumberScreen;
