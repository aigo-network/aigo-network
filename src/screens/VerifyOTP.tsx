import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { graphqlClient } from 'api/graphql';
import { appActions, appState } from 'state/app';
import { useSnapshot } from 'valtio';

import OTPFeature from './Login/OTPFeature';
import { phoneAuthConfirmation } from './shared';

export const VerifyOTPScreen = () => {
	const { navigate } = useNavigation();
	const { content } = useSnapshot(appState);
	const {
		title,
		subText,
		verifyButton,
		wrongCodeError,
		linkAccountError,
		updateAccountError,
		updateVerificationError,
	} = content.screens.phoneNumberVerify.OTP;

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
				throw Error(wrongCodeError);
			} else {
				throw Error(linkAccountError);
			}
		}

		if (!userCredential || !userCredential.user.phoneNumber) {
			throw Error(updateAccountError);
		}

		try {
			const phoneNumber = userCredential.user.phoneNumber;
			await graphqlClient.updateProfile({ profile: { phoneNumber } });
			await graphqlClient.verifyPhoneNumber();
			appActions.updatePhoneNumber(phoneNumber, true);
		} catch (error) {
			console.log('error', error);
			throw Error(updateVerificationError);
		}

		navigate('Profile');
	};
	return (
		<OTPFeature
			title={title}
			description={subText}
			verifyButton={verifyButton}
			confirmOTP={confirmOTP}
		/>
	);
};

export default VerifyOTPScreen;
