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

	const confirmOTP = async (code: string) => {
		try {
			const credential = await confirmation.confirm(code);
			if (!credential) throw new Error('Failed to get user credential');
		} catch (error) {
			console.log('error', error);
			throw Error('Wrong code, please try again');
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
			throw Error('Failed to update account, something went wrong');
		}
	};

	return (
		<OTPFeature
			title="Enter code"
			description="We've sent an SMS with a 6-digit activation code to your phone"
			confirmOTP={confirmOTP}
		/>
	);
};

export default OTPLoginScreen;
