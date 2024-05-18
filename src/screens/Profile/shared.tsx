import Animated, { FadeInDown } from 'react-native-reanimated';
import { Align, showModal } from 'components/Modal';
import PointPopup from 'components/PointPopup';

export const showReferralPoint = () => {
	const { cleanModal } = showModal(
		<Animated.View style={{ minWidth: 360 }} entering={FadeInDown}>
			<PointPopup point={50} onPressClose={() => cleanModal()} />
		</Animated.View>,
		{
			id: 'referral-point-popup',
			showBackdrop: true,
			align: Align.CenterCenter,
		},
	);
};
