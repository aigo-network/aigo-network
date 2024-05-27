import Animated, { FadeInDown } from 'react-native-reanimated';
import ConfirmPopup from 'components/ConfirmPopup';
import PointPopup from 'components/PointPopup';
import { Align, showModal } from 'empty-modal';
import { config } from 'utils/config';

export const showReferralPoint = () => {
	const { cleanModal } = showModal(
		<Animated.View entering={FadeInDown}>
			<PointPopup
				point={config.activity.InviteFriend.points}
				onPressClose={() => cleanModal()}
			/>
		</Animated.View>,
		{
			id: 'referral-point-popup',
			showBackdrop: true,
			xOffset: 16,
			align: Align.FullCenter,
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
				onClose={() => {
					cleanModal();
				}}
				message="Do you want to delete your account?"
				onConfirm={() => {
					cleanModal();
					deleteUser();
					logout();
				}}
				onReject={() => {
					cleanModal();
				}}
			/>
		</Animated.View>,
		{
			id: 'confirm-delete-user',
			showBackdrop: true,
			xOffset: 16,
			align: Align.FullCenter,
		},
	);
};
