import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Align, showModal } from 'empty-modal';
import PointPopup from 'modals/PointPopup';
import { showStartTripBottomSheet } from 'modals/StartTrip';
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { navigationRef } from 'utils/navigation';

type TripPointsConfig = {
	points: number;
};

export const showClaimTripPoint = ({ points }: TripPointsConfig) => {
	const { title, messagePrefix, messageSuffix } =
		appState.content.modal.earnPoints;
	const { startNewTrip, backToHome } = appState.content.screens.tripResult;

	const handleStartNewTrip = () => {
		navigationRef.navigate('BottomTab', { screen: 'Map' });
		cleanModal();
		showStartTripBottomSheet();
	};

	const handleBackToHome = () => {
		navigationRef.navigate('BottomTab', { screen: 'Home' });
		cleanModal();
	};

	const { cleanModal } = showModal(
		<Animated.View entering={FadeInDown}>
			<PointPopup
				point={points}
				title={title}
				messagePrefix={messagePrefix}
				messageSuffix={messageSuffix}
				showClose={false}
			>
				<View style={styles.buttonsContainer}>
					<TouchableOpacity
						style={styles.startNewButton}
						onPress={handleStartNewTrip}
					>
						<Text style={styles.startNewText}>{startNewTrip}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.backButton}
						onPress={handleBackToHome}
					>
						<Text style={styles.backText}>{backToHome}</Text>
					</TouchableOpacity>
				</View>
			</PointPopup>
		</Animated.View>,
		{
			id: 'trip-point-popup',
			showBackdrop: true,
			closeOnPressBackdrop: false,
			xOffset: 16,
			align: Align.FullCenter,
		},
	);
};

const styles = StyleSheet.create({
	buttonsContainer: {
		marginTop: 32,
		gap: 4,
	},
	startNewButton: {
		padding: 16,
		paddingVertical: 18,
		borderRadius: 46,
		backgroundColor: defaultTheme.textDark90,
		justifyContent: 'center',
		alignItems: 'center',
	},
	startNewText: {
		fontSize: 16,
		fontWeight: '600',
		color: defaultTheme.textLight,
	},
	backButton: {
		padding: 16,
		paddingVertical: 18,
		borderRadius: 46,
		justifyContent: 'center',
		alignItems: 'center',
	},
	backText: {
		fontSize: 16,
		fontWeight: '600',
		color: defaultTheme.textDark50,
	},
});
