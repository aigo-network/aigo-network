import type { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import X from '@aigo/components/icon/X';
import LottieView from 'lottie-react-native';
import { defaultTheme } from 'utils/global';

type Props = {
	point: number;
	title: string;
	messagePrefix: string;
	messageSuffix: string;
	description?: string;
	onPressClose?: () => void;
};

export const PointPopup: FC<Props> = ({
	point,
	title,
	messagePrefix,
	messageSuffix,
	description,
	onPressClose,
}) => {
	return (
		<View style={styles.container}>
			<View style={styles.giftContainer}>
				<LottieView
					source={require('assets/confetti-lottie.json')}
					style={styles.gift}
					autoPlay
					loop
				/>
				<View style={styles.rewardContainer}>
					<Text style={styles.highlightPoint}>{point}</Text>
					<Text style={styles.explainText}>GO {messageSuffix}</Text>
				</View>
			</View>

			<TouchableOpacity
				style={styles.closeButton}
				hitSlop={14}
				onPress={onPressClose}
			>
				<X color={defaultTheme.textDark80} width={14} />
			</TouchableOpacity>
			{/* <Image
				style={styles.pointTick}
				source={require('assets/img/point-tick.png')}
			/> */}
			<View style={{ gap: 8, alignItems: 'center' }}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.messageText}>
					{`${messagePrefix} `}
					<Text style={styles.highlightText}>{`${point} GO`}</Text>
					{` ${messageSuffix}.`}
				</Text>
			</View>
			{description && <Text style={styles.descriptionText}>{description}</Text>}
		</View>
	);
};

export default PointPopup;

const styles = StyleSheet.create({
	container: {
		backgroundColor: defaultTheme.bgLight,
		gap: 20,
		alignItems: 'center',
		padding: 20,
		paddingBottom: 40,
		paddingTop: 60,
		borderRadius: 20,
	},
	closeButton: {
		backgroundColor: defaultTheme.gray20,
		padding: 10,
		borderRadius: 20,
		position: 'absolute',
		right: 10,
		top: 10,
	},
	giftContainer: {
		width: 200,
		height: 200,
		position: 'relative',
	},
	gift: {
		position: 'absolute',
		left: -100,
		top: -130,
		width: 400,
		height: 400,
	},
	rewardContainer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	highlightPoint: {
		fontSize: 48,
		lineHeight: 58,
		fontWeight: '800',
		color: defaultTheme.cta100,
	},
	explainText: {
		fontSize: 16,
		lineHeight: 20,
		fontWeight: '500',
		color: defaultTheme.textDark70,
	},
	descriptionText: {
		fontSize: 16,
		color: defaultTheme.textDark70,
		textAlign: 'center',
	},
	title: {
		fontSize: 24,
		lineHeight: 28,
		fontWeight: '600',
		color: defaultTheme.textDark90,
	},
	messageText: {
		fontSize: 16,
		color: defaultTheme.textDark90,
		textAlign: 'center',
	},
	highlightText: {
		fontSize: 16,
		color: defaultTheme.cta100,
		fontWeight: '600',
	},
});
