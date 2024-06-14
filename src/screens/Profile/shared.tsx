import Animated, { FadeInDown } from 'react-native-reanimated';
import ConfirmPopup from '@aigo/components/ConfirmPopup';
import PointPopup from '@aigo/components/PointPopup';
import { config } from '@aigo/config';
import { Align, showModal } from 'empty-modal';
import { appState } from 'state/app';

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

export const showLogOutConfirm = ({ logout }: { logout: () => void }) => {
	const { confirm, cancel, confirmLogOutMessage } = appState.content.modal;
	const { cleanModal } = showModal(
		<Animated.View entering={FadeInDown}>
			<ConfirmPopup
				yesText={confirm}
				noText={cancel}
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
	const { confirmDeleteAccountMessage, yes, no } = appState.content.modal;
	const { cleanModal } = showModal(
		<Animated.View entering={FadeInDown}>
			<ConfirmPopup
				message={confirmDeleteAccountMessage}
				yesText={yes}
				noText={no}
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
