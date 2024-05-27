import Animated, { FadeInDown } from 'react-native-reanimated';
import ConfirmPopup from 'components/ConfirmPopup';
import { Align, showModal } from 'components/Modal';
import PointPopup from 'components/PointPopup';
import { config } from 'utils/config';

export const showReferralPoint = () => {
	const { cleanModal } = showModal(
		<Animated.View style={{ minWidth: 360 }} entering={FadeInDown}>
			<PointPopup
				point={config.activity.InviteFriend.points}
				onPressClose={() => cleanModal()}
			/>
		</Animated.View>,
		{
			id: 'referral-point-popup',
			showBackdrop: true,
			align: Align.CenterCenter,
		},
	);
};

export const showDeleteUserConfirm = ({
	deleteUser,
	logout,
}: {
	deleteUser: () => void;
	logout: () => void;
}) => {
	const { cleanModal } = showModal(
		<Animated.View entering={FadeInDown}>
			<ConfirmPopup
				onPressClose={() => {
					cleanModal();
				}}
				message="Do you want to delete your account?"
				onConfirmPress={() => {
					cleanModal();
					deleteUser();
					logout();
				}}
				onRejectPress={() => {
					cleanModal();
					logout();
				}}
			/>
		</Animated.View>,
		{
			id: 'confirm-delete-user',
			showBackdrop: true,
			align: Align.CenterCenter,
		},
	);
};
