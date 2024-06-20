import { Text } from 'react-native';
import { Align, showModal } from 'empty-modal';

import ModalContainer from '@/components/ModalContainer';

export const showInformation = (title: string, information: string) => {
	const { cleanModal } = showModal(
		<ModalContainer title={title} onClose={() => cleanModal()}>
			<Text style={{ color: '#000', fontSize: 18, lineHeight: 26 }}>
				{information}
			</Text>
		</ModalContainer>,
		{
			id: 'information',
			align: Align.CenterCenter,
			showBackdrop: true,
		},
	);
};
