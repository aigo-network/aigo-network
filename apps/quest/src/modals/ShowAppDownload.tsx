import { Linking, StyleSheet } from 'react-native';
import { TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Align, showModal } from 'empty-modal';

import ModalContainer from '@/components/ModalContainer';
import { appState } from '@/state/app';
import { isMobileBrowser } from '@/utils/helper';

export const showAppDownload = () => {
	if (!appState.user?.id) return;
	const downloadUrl = `https://ride.aigo.network/open?from=quest.aigo.network&web3ProfileId=${appState.user.id}`;
	const onDownloadPress = () => Linking.openURL(downloadUrl);

	if (isMobileBrowser()) {
		onDownloadPress();
	} else {
		const { cleanModal } = showModal(
			<ModalContainer title="Download AiGO" onClose={() => cleanModal()}>
				<View style={styles.container}>
					<TouchableOpacity
						style={styles.qrContainer}
						onPress={onDownloadPress}
					>
						<View style={styles.qrInnerContainer}>
							<QRCode value={downloadUrl} size={200} />
						</View>
					</TouchableOpacity>
				</View>
			</ModalContainer>,
			{
				id: 'download-app',
				align: Align.CenterCenter,
				showBackdrop: true,
			},
		);
	}
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 8,
		gap: 24,
	},
	qrContainer: {
		alignSelf: 'center',
		backgroundColor: '#f2f2f2',
		padding: 24,
		borderRadius: 18,
	},
	qrInnerContainer: {
		borderRadius: 8,
		overflow: 'hidden',
	},
	middleTxt: {
		fontWeight: '700',
		fontSize: 16,
		lineHeight: 24,
		color: '#707174',
		letterSpacing: 16 * 0.02,
		textAlign: 'center',
	},
	buttonsContainer: {
		gap: 12,
	},
	buttonContainer: {
		flex: 1,
	},
});
