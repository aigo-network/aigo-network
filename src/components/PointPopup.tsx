import type { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import X from './icon/X';

type Props = {
	point: number;
	description: string;
	onPressClose?: () => void;
};

export const PointPopup: FC<Props> = ({ point, description, onPressClose }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.closeButton}
				hitSlop={14}
				onPress={onPressClose}
			>
				<X color={'#9F9F9F'} width={14} />
			</TouchableOpacity>
			<Image
				style={styles.pointTick}
				source={require('assets/img/point-tick.png')}
			/>
			<View>
				<Text style={styles.titleText}>
					{'Yay! You’ve got '}
					<Text style={styles.highlightText}>{`${point} GO`}</Text>
				</Text>
			</View>
			<Text style={styles.descriptionText}>{description}</Text>
		</View>
	);
};

export default PointPopup;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		maxWidth: 340,
		gap: 20,
		alignItems: 'center',
		padding: 30,
		paddingBottom: 40,
		paddingTop: 60,
		borderRadius: 20,
	},
	closeButton: {
		backgroundColor: '#F0F0F0',
		padding: 10,
		borderRadius: 20,
		position: 'absolute',
		right: 10,
		top: 10,
	},
	pointTick: {
		width: 130,
		height: 130,
	},
	descriptionText: {
		fontSize: 16,
		color: '#898989',
		textAlign: 'center',
	},
	titleText: {
		fontSize: 22,
		color: '#000000',
	},
	highlightText: {
		fontSize: 22,
		color: '#6740FF',
		fontWeight: '600',
	},
});
