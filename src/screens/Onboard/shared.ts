import auth from '@react-native-firebase/auth';
import { graphqlClient } from 'api/graphql';
import { appActions, appState } from 'state/app';

const defaultAvatar =
	'https://aigo-app.s3.ap-south-1.amazonaws.com/images/default-avatar.png';

export const completeOnboarding = async () => {
	const onboardingProfile = appState.onboarding;
	const email = auth().currentUser?.email;
	const imageUrl = auth().currentUser?.photoURL || defaultAvatar;
	const { updateProfile: updatedUser } = await graphqlClient.updateProfile({
		profile: {
			...onboardingProfile,
			imageUrl,
			email,
		},
	});

	if (
		!updatedUser?.id ||
		!updatedUser.name ||
		!updatedUser.email ||
		!updatedUser.city ||
		!updatedUser.descriptions
	) {
		throw Error('Can not update profile, something went wrong');
	}

	const { completeOnboarding: user } = await graphqlClient.completeOnboarding();
	if (user) appActions.setAppUser(user);
};
