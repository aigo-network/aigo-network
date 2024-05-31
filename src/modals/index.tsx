import Animated, { FadeInDown } from 'react-native-reanimated';
import { Align, showModal } from 'empty-modal';

import type { CountryItem } from './CountrySelection/SelcetionItem';
import CountrySelectionModal from './CountrySelection';
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

export const showCountrySelection = (
	onCountrySelection: (item: CountryItem) => void,
) => {
	const { cleanModal } = showModal(
		<Animated.View entering={FadeInDown}>
			<CountrySelectionModal
				onClose={() => {
					cleanModal();
				}}
				onItemSelect={onCountrySelection}
			/>
		</Animated.View>,
		{
			id: 'country-selection',
			showBackdrop: true,
			align: Align.FullBottom,
		},
	);
};
