import { useEffect, useState } from 'react';
import { graphqlClient } from '@aigo/api/graphql';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { appActions, appState } from 'state/app';
import { useSnapshot } from 'valtio';

import OTPFeature from './OTPFeature';
import { confirmation } from './shared';

const OTPLoginScreen = () => {
	const navigation = useNavigation();
	const [code, setCode] = useState('');
	const { phoneSignIn } = useSnapshot(appState);
	const { content } = useSnapshot(appState);
	const {
		enterCode,
		subText,
		verifyButton,
		wrongCodeError,
		getCredentialsError,
		getProfileError,
	} = content.screens.logIn.otpConfirm;

	const handleAfterConfirmingOTP = async () => {
		try {
			appActions.updateOnboarding({
				phoneNumber: phoneSignIn.phoneNumber?.number,
			});
			const { user } = await graphqlClient.getUserProfile();
			if (user?.completeOnboarding) {
				navigation.reset({ routes: [{ name: 'Home' }] });
			} else {
				navigation.reset({ routes: [{ name: 'OnboardName' }] });
			}
		} catch (error) {
			console.log('error', error);
			throw Error(getProfileError);
		}
	};

	const confirmOTP = async (code: string) => {
		try {
			const credential = await confirmation.confirm(code);
			if (!credential) throw new Error(getCredentialsError);
		} catch (error) {
			console.log('error', error);
			throw Error(wrongCodeError);
		}

		await handleAfterConfirmingOTP();
	};

	useEffect(() => {
		const unsubscribe = auth().onAuthStateChanged(async (user) => {
			if (user) {
				console.log('OTP verified in background or updated');
				setCode('******');
				await handleAfterConfirmingOTP();
			}
		});

		return unsubscribe;
	}, []);

	return (
		<OTPFeature
			code={code}
			title={enterCode}
			description={subText}
			verifyButton={verifyButton}
			confirmOTP={confirmOTP}
		/>
	);
};

export default OTPLoginScreen;
