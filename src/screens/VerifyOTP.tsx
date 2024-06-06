import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { graphqlClient } from 'api/graphql';

import OTPFeature from './Login/OTPFeature';
import { phoneAuthConfirmation } from './shared';

export const VerifyOTPScreen = () => {
	const { navigate } = useNavigation();

	const confirmOTP = async (code: string) => {
		let userCredential: FirebaseAuthTypes.UserCredential | undefined;
		try {
			const credential = auth.PhoneAuthProvider.credential(
				phoneAuthConfirmation.verificationId,
				code,
			);
			userCredential = await auth().currentUser?.linkWithCredential(credential);
		} catch (error) {
			const err = error as FirebaseAuthTypes.PhoneAuthError;
			if (err.code == 'auth/invalid-verification-code') {
				throw Error('Wrong code, please try again');
			} else {
				throw Error('Failed to link account, something went wrong');
			}
		}

		if (!userCredential || !userCredential.user.phoneNumber) {
			throw Error('Failed to get updated account, something went wrong');
		}

		try {
			const phoneNumber = userCredential.user.phoneNumber;
			await graphqlClient.updateProfile({ profile: { phoneNumber } });
			await graphqlClient.verifyPhoneNumber();
		} catch (error) {
			console.log('error', error);
			throw Error('Failed to update verification, something went wrong');
		}

		navigate('Profile');
	};
	return (
		<OTPFeature
			title="Enter code"
			description="We've sent an SMS with a 6-digit activation code to your phone"
			confirmOTP={confirmOTP}
		/>
	);
};

export default VerifyOTPScreen;
