import { KeyboardAvoidingView, Platform } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import SafeContainer from 'components/SafeContainer';
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
			<SafeContainer style={{ paddingBottom: 0 }}>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'android' ? 'height' : undefined}
				>
					<CountrySelectionModal
						onClose={() => {
							cleanModal();
						}}
						onItemSelect={onCountrySelection}
						title={appState.content.modal.citySelection.title}
						placeholder={appState.content.modal.citySelection.placeholder}
						cancelButton={appState.content.modal.citySelection.cancelButton}
					/>
				</KeyboardAvoidingView>
			</SafeContainer>
		</Animated.View>,
		{
			id: 'country-selection',
			showBackdrop: true,
			align: Align.FullBottom,
		},
	);
};
