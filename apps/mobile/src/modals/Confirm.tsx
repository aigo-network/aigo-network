import Animated, { FadeInDown } from 'react-native-reanimated';
import type { Props } from '@aigo/components/ConfirmPopup';
import ConfirmPopup from '@aigo/components/ConfirmPopup';
import { Align, showModal } from 'empty-modal';

export type ConfirmConfig = Props & {
	modalId: string;
};

export const showConfirmModal = (config: ConfirmConfig) => {
	const { cleanModal } = showModal(
		<Animated.View entering={FadeInDown}>
			<ConfirmPopup
				{...config}
				onClose={() => {
					cleanModal();
					config.onClose?.();
				}}
				onConfirm={() => {
					cleanModal();
					config.onConfirm?.();
				}}
				onReject={() => {
					cleanModal();
					config.onReject?.();
				}}
			/>
		</Animated.View>,
		{
			id: config.modalId,
			showBackdrop: true,
			xOffset: 16,
			align: Align.FullCenter,
		},
	);
};
