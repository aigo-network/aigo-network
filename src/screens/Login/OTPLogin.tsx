import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { graphqlClient } from 'api/graphql';
import { setJWT } from 'api/jwt';
import { appActions, appState } from 'state/app';
import { useSnapshot } from 'valtio';

import OTPFeature from './OTPFeature';
import { confirmation } from './shared';

const OTPLoginScreen = () => {
	const navigation = useNavigation();
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

	const confirmOTP = async (code: string) => {
		try {
			const credential = await confirmation.confirm(code);
			if (!credential) throw new Error(getCredentialsError);
		} catch (error) {
			console.log('error', error);
			throw Error(wrongCodeError);
		}

		try {
			appActions.updateOnboarding({
				phoneNumber: phoneSignIn.phoneNumber?.number,
			});
			const jwt = await auth().currentUser?.getIdToken();
			if (jwt) setJWT(jwt);
			const { user } = await graphqlClient.getUserProfile();
			if (user?.completeOnboarding) {
				navigation.navigate('Home');
			} else {
				navigation.navigate('OnboardName');
			}
		} catch (error) {
			console.log('error', error);
			throw Error(getProfileError);
		}
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

export default OTPLoginScreen;
