import type { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import X from './icon/X';
import { Button } from './Button';

export interface Props {
	message: string;
	onClose?: () => void;
	onConfirm?: () => void;
	onReject?: () => void;
	yesText?: string;
	noText?: string;
	mainAction?: 'yes' | 'no';
}

export const ConfirmPopup: FC<Props> = ({
	message,
	onClose,
	onConfirm,
	onReject,
	yesText,
	noText,
	mainAction = 'no',
}) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.closeButton}
				hitSlop={14}
				onPress={onClose}
			>
				<X color="#9F9F9F" width={14} />
			</TouchableOpacity>
			<Text style={styles.message}>{message}</Text>

			<View style={styles.buttonGr}>
				<Button
					style={[styles.btn, mainAction === 'yes' && styles.mainBtn]}
					onPress={onConfirm}
				>
					<Text
						style={[styles.btnText, mainAction === 'yes' && styles.mainBtnText]}
					>
						{yesText}
					</Text>
				</Button>
				<Button
					style={[styles.btn, mainAction === 'no' && styles.mainBtn]}
					onPress={onReject}
				>
					<Text
						style={[styles.btnText, mainAction === 'no' && styles.mainBtnText]}
					>
						{noText}
					</Text>
				</Button>
			</View>
		</View>
	);
};

export default ConfirmPopup;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		paddingHorizontal: 30,
		paddingTop: 60,
		paddingBottom: 40,
		borderRadius: 20,
		alignItems: 'center',
		gap: 20,
	},
	closeButton: {
		backgroundColor: '#F0F0F0',
		padding: 10,
		borderRadius: 20,
		position: 'absolute',
		right: 10,
		top: 10,
	},
	message: {
		fontSize: 18,
		fontWeight: '700',
		textAlign: 'center',
		alignSelf: 'center',
		color: '#000',
	},
	buttonGr: {
		flexDirection: 'row',
		gap: 15,
	},
	btn: {
		backgroundColor: '#EFEFEF',
		paddingVertical: 12,
		borderRadius: 50,
		flex: 1,
	},
	mainBtn: {
		backgroundColor: '#a0fa82',
	},
	btnText: {
		fontWeight: '500',
		fontSize: 19,
		color: '#4D4D4D',
	},
	mainBtnText: {
		color: '#6740FF',
	},
});
