import type { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import X from '@aigo/components/icon/X';
import LottieView from 'lottie-react-native';
import { defaultTheme } from 'utils/global';

interface Props {
	onClose: () => void;
	title: string;
	descriptionHighlight?: string;
	descriptionPrefix?: string;
	descriptionSuffix?: string;
	highlightButtonText: string;
	normalButtonText: string;
	onHighlightPress?: () => void;
	onNormalPress?: () => void;
	lottieEnable?: boolean;
	limitNoteEnable?: boolean;
}

const RewardModalCore: FC<Props> = ({
	onClose,
	title,
	descriptionHighlight,
	descriptionPrefix,
	descriptionSuffix,
	highlightButtonText,
	normalButtonText,
	onHighlightPress,
	onNormalPress,
	lottieEnable = false,
	limitNoteEnable = false,
}) => {
	return (
		<View style={styles.container}>
			<View style={styles.closeContainer}>
				<TouchableOpacity
					style={styles.closeButton}
					hitSlop={14}
					onPress={onClose}
				>
					<X color={defaultTheme.textDark90} width={12} />
				</TouchableOpacity>
			</View>
			{lottieEnable && (
				<View style={styles.lottieContainer}>
					<LottieView
						speed={2}
						source={require('assets/confetti-lottie.json')}
						style={styles.lottie}
						autoPlay
						loop
					/>
					<View style={styles.tickContainer}>
						<Svg width="48" height="48" viewBox="0 0 48 48" fill="none">
							<Path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M23.9995 0C37.252 0 47.9995 10.7475 47.9995 24C47.9995 37.2525 37.252 48 23.9995 48C10.747 48 -0.000488281 37.2525 -0.000488281 24C-0.000488281 10.7475 10.747 0 23.9995 0ZM19.0156 31.7954L13.1398 25.9147C12.1388 24.9131 12.1386 23.2797 13.1398 22.2783C14.1413 21.2771 15.7819 21.2833 16.7761 22.2783L20.9185 26.424L31.2233 16.1191C32.2248 15.1176 33.8583 15.1176 34.8596 16.1191C35.861 17.1203 35.8596 18.7553 34.8596 19.7553L22.7336 31.8812C21.7336 32.8812 20.0986 32.8827 19.0974 31.8812C19.0693 31.8531 19.0421 31.8245 19.0156 31.7954Z"
								fill={defaultTheme.cta100}
							/>
						</Svg>
					</View>
				</View>
			)}
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.description}>
				{descriptionPrefix}{' '}
				<Text style={styles.highlight}>{descriptionHighlight}</Text>{' '}
				{descriptionSuffix}
			</Text>
			{limitNoteEnable && (
				<Text style={styles.limitNote}>
					Limitation for user: get 1 voucher each day.
				</Text>
			)}

			<View style={styles.buttonGroup}>
				<TouchableOpacity
					style={styles.solidButtonContainer}
					onPress={onHighlightPress}
				>
					<Text style={styles.solidButtonLabel}>{highlightButtonText}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.textButtonContainer}
					onPress={onNormalPress}
				>
					<Text style={styles.textButtonLabel}>{normalButtonText}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default RewardModalCore;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 16,
		paddingBottom: 24,
		borderRadius: 16,
		backgroundColor: defaultTheme.bgLight,
	},
	closeContainer: {
		paddingTop: 12,
		paddingHorizontal: 12,
		alignItems: 'flex-end',
	},
	closeButton: {
		padding: 8,
		borderRadius: 50,
		backgroundColor: defaultTheme.gray20,
	},
	lottieContainer: {
		width: 200,
		height: 200,
		position: 'relative',
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
	},
	lottie: {
		position: 'absolute',
		left: -100,
		top: -130,
		width: 400,
		height: 400,
	},
	tickContainer: {
		padding: 16,
		borderRadius: 100,
		backgroundColor: 'rgba(52, 195, 244, 0.12)',
		borderWidth: 16,
		borderColor: 'rgba(52, 195, 244, 0.04)',
	},
	title: {
		fontSize: 24,
		lineHeight: 28,
		fontWeight: '600',
		color: defaultTheme.textDark90,
		textAlign: 'center',
	},
	description: {
		marginTop: 8,
		marginHorizontal: 16,
		textAlign: 'center',
		fontSize: 16,
		lineHeight: 28,
		color: defaultTheme.textDark90,
	},
	highlight: {
		color: defaultTheme.cta100,
	},
	limitNote: {
		marginTop: 8,
		textAlign: 'center',
		lineHeight: 20,
		color: defaultTheme.textDark50,
	},
	buttonGroup: {
		marginTop: 24,
	},
	solidButtonContainer: {
		alignItems: 'center',
		paddingVertical: 16,
		marginHorizontal: 16,
		borderRadius: 50,
		backgroundColor: defaultTheme.textDark90,
	},
	solidButtonLabel: {
		fontSize: 16,
		fontWeight: '600',
	},
	textButtonContainer: {
		marginTop: 8,
		paddingVertical: 16,
		alignItems: 'center',
	},
	textButtonLabel: {
		fontSize: 16,
		lineHeight: 19,
		fontWeight: '600',
		color: defaultTheme.textDark50,
	},
});
