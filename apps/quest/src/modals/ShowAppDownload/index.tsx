import { Align, showModal } from 'empty-modal';

import ModalInner from './Modal';

import ModalContainer from '@/components/ModalContainer';

export const showAppDownload = ({
	playStore,
	appStore,
}: {
	playStore: string;
	appStore: string;
}) => {
	const { cleanModal } = showModal(
		<ModalContainer title="Download AiGO" onClose={() => cleanModal()}>
			<ModalInner playStore={playStore} appStore={appStore} />
		</ModalContainer>,
		{
			id: 'download-app',
			align: Align.CenterCenter,
			showBackdrop: true,
		},
	);
};

export * from './Modal';
