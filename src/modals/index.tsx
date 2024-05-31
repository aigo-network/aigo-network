import Animated, { FadeInDown } from 'react-native-reanimated';
import { Align, showModal } from 'empty-modal';

import LanguageSelectionModal from './LanguageSelection';

export const showLanguageSelection = () => {
	const { cleanModal } = showModal(
		<Animated.View entering={FadeInDown}>
			<LanguageSelectionModal
				onClose={() => {
					cleanModal();
				}}
			/>
		</Animated.View>,
		{
			id: 'language-selection',
			showBackdrop: true,
			xOffset: 16,
			align: Align.FullCenter,
		},
	);
};
