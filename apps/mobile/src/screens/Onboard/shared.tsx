import Animated, { FadeInDown } from 'react-native-reanimated';
import { graphqlClient } from '@aigo/api/graphql';
import { config } from '@aigo/config';
import auth from '@react-native-firebase/auth';
import { Align, showModal } from 'empty-modal';
import PointPopup from 'modals/PointPopup';
import { appActions, appState } from 'state/app';
import { getDefaultUserInfoFromStorage } from 'state/app/userInfo';
import { getAuthEmail } from 'utils/auth';
import { defaultAvatar, defaultEmail } from 'utils/misc';

export const completeOnboarding = async (cityFallback?: string) => {
	const { city, name, descriptions, phoneNumber } = appState.onboarding;
	const authEmail = getAuthEmail();
	const storedEmail = (await getDefaultUserInfoFromStorage()).email;
	const email = authEmail || storedEmail || defaultEmail;

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
		const { title, completedOnboardingMessage, messagePrefix, messageSuffix } =
			appState.content.modal.earnPoints;
		const { cleanModal } = showModal(
			<Animated.View entering={FadeInDown}>
				<PointPopup
					point={config.activity.CompleteOnboarding.points}
					title={title}
					messagePrefix={messagePrefix}
					messageSuffix={messageSuffix}
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
