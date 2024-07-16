import { StyleSheet, Text } from 'react-native';
import { Align, showModal } from 'empty-modal';

import ModalContainer from '@/components/ModalContainer';

export const showInformation = (title: string, information: string) => {
	const { cleanModal } = showModal(
		<ModalContainer title={title} onClose={() => cleanModal()}>
			<Text style={styles.text}>{information}</Text>
		</ModalContainer>,
		{
			id: 'information',
			align: Align.CenterCenter,
			showBackdrop: true,
		},
	);
};

const styles = StyleSheet.create({
	text: {
		color: '#ffffff',
		fontSize: 18,
		lineHeight: 26,
	},
});
