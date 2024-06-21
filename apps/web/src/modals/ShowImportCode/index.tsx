import { StyleSheet, Text } from 'react-native';
import { Align, showModal } from 'empty-modal';
import Link from 'next/link';

import InputCode from './InputCode';

import ModalContainer from '@/components/ModalContainer';

export const showImportCode = () => {
	const { cleanModal } = showModal(
		<ModalContainer
			title="Import Referral Code"
			subTitle={
				<Text style={styles.subTitleText}>
					You need a code to participate. If you don&apos;t have one,{'\n'}can
					find a code on{' '}
					<Link
						style={styles.linkText}
						href="https://x.com/AIGO_Network"
						target="_blank"
					>
						our Twitter Profile
					</Link>
				</Text>
			}
			onClose={() => cleanModal()}
		>
			<InputCode handleClose={() => cleanModal()} />
		</ModalContainer>,
		{
			id: 'import-code',
			align: Align.CenterCenter,
			showBackdrop: true,
		},
	);
};

const styles = StyleSheet.create({
	subTitleText: {
		fontSize: 16,
		lineHeight: 24,
		color: '#707174',
	},
	linkText: {
		color: '#625bf6',
	},
});
