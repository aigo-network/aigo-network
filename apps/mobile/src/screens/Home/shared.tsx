import type { ImageSourcePropType } from 'react-native';
import { StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { InviteCode } from '@aigo/components/InviteCode';
import { config } from '@aigo/config';
import { Align, showModal } from 'empty-modal';
import PointPopup from 'modals/PointPopup';
import mustache from 'mustache';
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';

export const sharedStyles = StyleSheet.create({
	container: {
		backgroundColor: defaultTheme.gray10,
		padding: 16,
		paddingTop: 18,
		paddingBottom: 22,
		borderRadius: 20,
		gap: 14,
	},
	title: {
		color: defaultTheme.textDark90,
		fontSize: 17,
	},
});

export const showInvitationCode = () => {
	const code = appState.appUser?.invitationCode;
	if (!code) return;

	const { invitationUrl } = appState.remoteConfig;
	const shareUrl = `${invitationUrl}?inviteCode=${code}`;
	const points = config.activity.InviteFriend.points;
	const { title, description, message, referral, codeTitle, shareButton } =
		appState.content.modal.invite;

	const shareMessage = mustache.render(message, {
		url: shareUrl,
		points: 100,
		code,
	});

	const { cleanModal } = showModal(
		<Animated.View entering={FadeInDown.duration(500)}>
			<InviteCode
				title={title}
				description={description}
				codeTitle={codeTitle}
				code={code}
				points={points}
				referralText={referral}
				shareMessage={shareMessage}
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
	const { title, messagePrefix, messageSuffix } =
		appState.content.modal.earnPoints;

	const { cleanModal } = showModal(
		<Animated.View entering={FadeInDown}>
			<PointPopup
				point={config.activity.DailyCheckIn.points}
				title={title}
				messagePrefix={messagePrefix}
				messageSuffix={messageSuffix}
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

export const bannerMap: Record<string, ImageSourcePropType> = {
	tada: require('assets/img/banner/tada-banner.png'),
};
