import Animated, { FadeInDown } from 'react-native-reanimated';
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
