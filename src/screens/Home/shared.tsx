import { StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { InviteCode } from 'components/InviteCode';
import { Align, showModal } from 'components/Modal';
import PointPopup from 'components/PointPopup';
import { appState } from 'state/app';

export const sharedStyles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		padding: 16,
		paddingTop: 18,
		paddingBottom: 22,
		borderRadius: 20,
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.1,
		shadowRadius: 1.5,
		elevation: 2,
		gap: 14,
	},
	title: {
		color: '#000',
		fontSize: 17,
	},
});

export const showInvitationCode = () => {
	const code = appState.appUser?.invitationCode;
	if (!code) return;

	const { cleanModal } = showModal(
		<Animated.View entering={FadeInDown.duration(500)}>
			<InviteCode code={code} onPressClose={() => cleanModal()} />
		</Animated.View>,
		{
			id: 'invitation-code',
			align: Align.CenterCenter,
			showBackdrop: true,
		},
	);
};

export const showCheckInPoint = () => {
	const { cleanModal } = showModal(
		<Animated.View style={{ minWidth: 360 }} entering={FadeInDown}>
			<PointPopup point={30} onPressClose={() => cleanModal()} />
		</Animated.View>,
		{
			id: 'checkin-point-popup',
			showBackdrop: true,
			align: Align.CenterCenter,
		},
	);
};
