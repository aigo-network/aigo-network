import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { graphqlClient } from 'api/graphql';
import { appState } from 'state/app';
import { useSnapshot } from 'valtio';

import OTPFeature from './Login/OTPFeature';
import { phoneAuthConfirmation } from './shared';

export const VerifyOTPScreen = () => {
	const { navigate } = useNavigation();
	const { content } = useSnapshot(appState);
	const { enterCode, subText, verifyButton } = content.screens.logIn.otpConfirm;

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
			title={enterCode}
			description={subText}
			verifyButton={verifyButton}
			confirmOTP={confirmOTP}
		/>
	);
};

export default VerifyOTPScreen;
