import Animated, { FadeInDown } from 'react-native-reanimated';
import { graphqlClient } from '@aigo/api/graphql';
import PointPopup from '@aigo/components/PointPopup';
import { config } from '@aigo/config';
import auth from '@react-native-firebase/auth';
import { Align, showModal } from 'empty-modal';
import { appActions, appState } from 'state/app';
import { getDefaultUserInfo } from 'state/app/userInfo';
import { defaultAvatar, defaultEmail } from 'utils/misc';

export const completeOnboarding = async (cityFallback?: string) => {
	const { city, name, descriptions, phoneNumber } = appState.onboarding;
	const email =
		auth().currentUser?.email ||
		(await getDefaultUserInfo()).email ||
		defaultEmail;
	const imageUrl = auth().currentUser?.photoURL || defaultAvatar;
	const { updateProfile: updatedUser } = await graphqlClient.updateProfile({
		profile: {
			name,
			descriptions,
			city: city || cityFallback,
			imageUrl,
			email,
			phoneNumber,
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

	if (phoneNumber) {
		await graphqlClient.verifyPhoneNumber();
	}

	setTimeout(() => {
		const { completedOnboardingMessage, messagePrefix } =
			appState.content.modal.earnPoints;
		const { cleanModal } = showModal(
			<Animated.View entering={FadeInDown}>
				<PointPopup
					point={config.activity.CompleteOnboarding.points}
					messagePrefix={messagePrefix}
					description={completedOnboardingMessage}
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
