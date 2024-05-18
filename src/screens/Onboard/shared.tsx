import Animated, { FadeInDown } from 'react-native-reanimated';
import auth from '@react-native-firebase/auth';
import { graphqlClient } from 'api/graphql';
import { Align, showModal } from 'components/Modal';
import PointPopup from 'components/PointPopup';
import { appActions, appState } from 'state/app';
import { defaultAvatar } from 'utils/misc';

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

	setTimeout(() => {
		showModal(
			<Animated.View entering={FadeInDown}>
				<PointPopup
					point={user?.GOPoints || 50}
					description="Your account is ready to use. You will be redirected to the Home Page in a few seconds."
				/>
			</Animated.View>,
			{
				id: 'onboarding-point-popup',
				showBackdrop: true,
				align: Align.CenterCenter,
			},
		);
	}, 500);
};
