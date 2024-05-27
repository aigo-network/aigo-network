import type { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import X from './icon/X';
import { Button } from './Button';

interface Props {
	message: string;
	onPressClose: () => void;
	onConfirmPress?: () => void;
	onRejectPress?: () => void;
}

export const ConfirmPopup: FC<Props> = ({
	message,
	onPressClose,
	onConfirmPress,
	onRejectPress,
}) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.closeButton}
				hitSlop={14}
				onPress={onPressClose}
			>
				<X color="#9F9F9F" width={14} />
			</TouchableOpacity>
			<Text style={styles.message}>{message}</Text>

			<View style={styles.buttonGr}>
				<Button style={styles.btn} onPress={onConfirmPress}>
					<Text style={styles.btnText}>Yes</Text>
				</Button>
				<Button style={styles.btn} onPress={onRejectPress}>
					<Text style={styles.btnText}>No</Text>
				</Button>
			</View>
		</View>
	);
};

export default ConfirmPopup;

const styles = StyleSheet.create({
	container: {
		width: 360,
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
		backgroundColor: '#a0fa82',
		paddingVertical: 5,
		borderRadius: 50,
		flex: 1,
	},
	btnText: {
		fontWeight: '500',
		fontSize: 19,
		color: '#6740FF',
	},
});
