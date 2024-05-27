import Animated, { FadeInDown } from 'react-native-reanimated';
import auth from '@react-native-firebase/auth';
import { graphqlClient } from 'api/graphql';
import PointPopup from 'components/PointPopup';
import { Align, showModal } from 'empty-modal';
import { appActions, appState } from 'state/app';
import { config } from 'utils/config';
import { defaultAvatar, defaultEmail } from 'utils/misc';

export const completeOnboarding = async () => {
	const onboardingProfile = appState.onboarding;
	const email = auth().currentUser?.email || defaultEmail;
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
		throw Error(appState.content.screens.onboard.updateProfileError);
	}

	const { completeOnboarding: user } = await graphqlClient.completeOnboarding();
	if (user) appActions.setAppUser(user);

	setTimeout(() => {
		const { cleanModal } = showModal(
			<Animated.View entering={FadeInDown}>
				<PointPopup
					point={config.activity.CompleteOnboarding.points}
					description={
						appState.content.modal.earnPoints.completedOnboardingMessage
					}
					onPressClose={() => {
						cleanModal();
					}}
				/>
			</Animated.View>,
			{
				id: 'onboarding-point-popup',
				showBackdrop: true,
				xOffset: 16,
				align: Align.FullCenter,
			},
		);
	}, 650);
};
