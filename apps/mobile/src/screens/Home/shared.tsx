import { StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { InviteCode } from '@aigo/components/InviteCode';
import PointPopup from '@aigo/components/PointPopup';
import { config } from '@aigo/config';
import { Align, showModal } from 'empty-modal';
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
	const points = config.activity.InviteFriend.points;
	const {
		title,
		description,
		messagePrefix,
		messageSuffix,
		referral,
		codeTitle,
		shareButton,
	} = appState.content.modal.invite;

	const { cleanModal } = showModal(
		<Animated.View entering={FadeInDown.duration(500)}>
			<InviteCode
				title={title}
				description={description}
				codeTitle={codeTitle}
				code={code}
				points={points}
				referralText={referral}
				shareMessage={`${messagePrefix} https://app.aigo.network/download?inviteCode=${code} ${messageSuffix}: ${code}`}
				shareButtonText={shareButton}
				onPressClose={() => cleanModal()}
			/>
		</Animated.View>,
		{
			id: 'invitation-code',
			align: Align.FullCenter,
			xOffset: 16,
			showBackdrop: true,
		},
	);
};

export const showCheckInPoint = () => {
	const { messagePrefix } = appState.content.modal.earnPoints;

	const { cleanModal } = showModal(
		<Animated.View entering={FadeInDown}>
			<PointPopup
				point={config.activity.DailyCheckIn.points}
				messagePrefix={messagePrefix}
				onPressClose={() => cleanModal()}
			/>
		</Animated.View>,
		{
			id: 'checkin-point-popup',
			showBackdrop: true,
			xOffset: 16,
			align: Align.FullCenter,
		},
	);
};
