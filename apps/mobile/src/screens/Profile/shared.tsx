import Animated, { FadeInDown } from 'react-native-reanimated';
import { config } from '@aigo/config';
import { Align, showModal } from 'empty-modal';
import ConfirmPopup from 'modals/ConfirmPopup';
import PointPopup from 'modals/PointPopup';
import { appState } from 'state/app';

export const showReferralPoint = () => {
	const { title, messagePrefix, messageSuffix } =
		appState.content.modal.earnPoints;
	const points = config.activity.InviteFriend.points;

	const { cleanModal } = showModal(
		<Animated.View entering={FadeInDown}>
			<PointPopup
				point={points}
				title={title}
				messagePrefix={messagePrefix}
				messageSuffix={messageSuffix}
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

export const showLogOutConfirm = ({ logout }: { logout: () => void }) => {
	const { confirm, cancel, confirmLogOutTitle, confirmLogOutMessage } =
		appState.content.modal;
	const { cleanModal } = showModal(
		<Animated.View entering={FadeInDown}>
			<ConfirmPopup
				confirmText={confirm}
				cancelText={cancel}
				title={confirmLogOutTitle}
				message={confirmLogOutMessage}
				onClose={() => {
					cleanModal();
				}}
				onConfirm={() => {
					logout();
					cleanModal();
				}}
				onReject={() => {
					cleanModal();
				}}
			/>
		</Animated.View>,
		{
			id: 'confirm-logout',
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
	const { confirmDeleteAccountTitle, confirmDeleteAccountMessage, yes, no } =
		appState.content.modal;
	const { cleanModal } = showModal(
		<Animated.View entering={FadeInDown}>
			<ConfirmPopup
				title={confirmDeleteAccountTitle}
				message={confirmDeleteAccountMessage}
				confirmText={yes}
				cancelText={no}
				onClose={() => {
					cleanModal();
				}}
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

export const formatEmail = (email: string | undefined | null) => {
	if (!email || email === 'unknown@aigo.network') {
		return '';
	}	

	return email;
};
