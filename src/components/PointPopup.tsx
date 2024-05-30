import type { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { appState } from 'state/app';
import { useSnapshot } from 'valtio';

import X from './icon/X';

type Props = {
	point: number;
	description?: string;
	onPressClose?: () => void;
};

export const PointPopup: FC<Props> = ({ point, description, onPressClose }) => {
	const { content } = useSnapshot(appState);
	const { messagePrefix } = content.modal.earnPoints;

	return (
		<View style={styles.container}>
			<View style={styles.giftContainer}>
				<LottieView
					source={require('assets/gift-lottie.json')}
					style={styles.gift}
					autoPlay
					loop
				/>
			</View>

			<TouchableOpacity
				style={styles.closeButton}
				hitSlop={14}
				onPress={onPressClose}
			>
				<X color={'#9F9F9F'} width={14} />
			</TouchableOpacity>
			{/* <Image
				style={styles.pointTick}
				source={require('assets/img/point-tick.png')}
			/> */}
			<View>
				<Text style={styles.titleText}>
					{`🎁 ${messagePrefix} `}
					<Text style={styles.highlightText}>{`${point} GO!`}</Text>
				</Text>
			</View>
			{description && <Text style={styles.descriptionText}>{description}</Text>}
		</View>
	);
};

export default PointPopup;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
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
	giftContainer: {
		width: 200,
		height: 200,
	},
	gift: {
		position: 'absolute',
		left: -100,
		top: -140,
		width: 400,
		height: 400,
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
