import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import type { PhoneNumber } from 'libphonenumber-js';
import { appActions } from 'state/app';

import PhoneFeature from './PhoneFeature';
import { setConfirmation } from './shared';

const PhoneLoginScreen = () => {
	const navigation = useNavigation();

	const signInWithPhoneNumber = async (phoneNumber: PhoneNumber) => {
		try {
			const confirmation = await auth().signInWithPhoneNumber(
				phoneNumber.number,
			);
			if (confirmation) setConfirmation(confirmation);
			appActions.updatePhoneSignIn(phoneNumber);
			navigation.navigate('OtpInput');
		} catch (error) {
			console.log('Error phone sign in:', error);
		}
	};

	return (
		<PhoneFeature
			title="Login"
			description="Please confirm your country code and enter your phone number."
			signInWithPhoneNumber={signInWithPhoneNumber}
		/>
	);
};

export default PhoneLoginScreen;
