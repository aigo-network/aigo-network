import Animated, { FadeInDown } from 'react-native-reanimated';
import { Align, showModal } from 'empty-modal';
import { appState } from 'state/app';

import type { CountryItem } from './CountrySelection/SelectionItem';
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
				title={appState.content.modal.citySelection.title}
				placeholder={appState.content.modal.citySelection.placeholder}
				cancelButton={appState.content.modal.citySelection.cancelButton}
			/>
		</Animated.View>,
		{
			id: 'country-selection',
			showBackdrop: true,
			align: Align.FullBottom,
		},
	);
};
