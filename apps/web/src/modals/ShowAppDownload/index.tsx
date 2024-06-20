import { Align, showModal } from 'empty-modal';

import ModalInner from './Modal';

import ModalContainer from '@/components/ModalContainer';

export const showAppDownload = () => {
	const { cleanModal } = showModal(
		<ModalContainer
			title="Download AiGO"
			style={{ width: 420 }}
			onClose={() => cleanModal()}
		>
			<ModalInner />
		</ModalContainer>,
		{
			id: 'download-app',
			align: Align.CenterCenter,
			showBackdrop: true,
		},
	);
};

export * from './Modal';
