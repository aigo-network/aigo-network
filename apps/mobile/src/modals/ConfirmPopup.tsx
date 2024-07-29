import type { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import X from '@aigo/components/icon/X';
import { Button } from 'components/Button';
import { defaultTheme } from 'utils/global';

export interface Props {
	title: string;
	message?: string;
	onClose: () => void;
	onConfirm?: () => void;
	onReject?: () => void;
	confirmText?: string;
	cancelText?: string;
	mainAction?: 'confirm' | 'cancel';
}

export const ConfirmPopup: FC<Props> = ({
	title,
	message,
	onClose,
	onConfirm,
	onReject,
	confirmText,
	cancelText,
	mainAction = 'cancel',
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
			<View style={{ gap: 8 }}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.message}>{message}</Text>
			</View>

			<View style={styles.buttonGr}>
				<Button
					style={[styles.btn, mainAction === 'confirm' && styles.defaultBtn]}
					onPress={onConfirm}
				>
					<Text
						style={[
							styles.btnText,
							mainAction === 'confirm' && styles.defaultBtnText,
						]}
					>
						{confirmText}
					</Text>
				</Button>
				<Button
					style={[styles.btn, mainAction === 'cancel' && styles.defaultBtn]}
					onPress={onReject}
				>
					<Text
						style={[
							styles.btnText,
							mainAction === 'cancel' && styles.defaultBtnText,
						]}
					>
						{cancelText}
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
	title: {
		fontSize: 18,
		fontWeight: '600',
		textAlign: 'center',
		alignSelf: 'center',
		color: defaultTheme.textDark90,
	},
	message: {
		fontSize: 16,
		fontWeight: '500',
		color: defaultTheme.textDark70,
	},
	buttonGr: {
		flexDirection: 'row',
		gap: 15,
	},
	btn: {
		backgroundColor: defaultTheme.gray20,
		paddingVertical: 12,
		borderRadius: 50,
		flex: 1,
	},
	defaultBtn: {
		backgroundColor: defaultTheme.cta100,
	},
	btnText: {
		fontWeight: '500',
		fontSize: 16,
		color: defaultTheme.textDark70,
	},
	defaultBtnText: {
		color: defaultTheme.textLight,
	},
});
