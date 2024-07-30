import { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { showConfirmModal } from 'modals/Confirm';
import { showStartTripBottomSheet } from 'modals/StartTrip';
import { appState } from 'state/app';
import { mapActions, useMapState } from 'state/map';
import { defaultTheme } from 'utils/global';
import { useSnapshot } from 'valtio';

import { useBouncedMapInsets } from './shared';

export const TripActions = () => {
	const { safeInsets } = useBouncedMapInsets();
	const { content } = useSnapshot(appState);
	const { currentTrip, startTripMetadata } = useMapState();
	const [loading, setLoading] = useState(false);

	const { bottom } = safeInsets;
	const { startButton, confirmStart, endButton, confirmEnd } =
		content.screens.map;

	const handlePressStart = async () => {
		if (!startTripMetadata) {
			showStartTripBottomSheet();
			return;
		}

		setLoading(true);
		const { title, confirm, cancel } = confirmStart;
		showConfirmModal({
			modalId: 'confirm-start-trip',
			title: title,
			confirmText: confirm,
			cancelText: cancel,
			mainAction: 'confirm',
			onConfirm: async () => {
				await mapActions.startNewTrip();
				setLoading(false);
			},
			onClose: () => {
				setLoading(false);
			},
			onReject: () => {
				setLoading(false);
			},
		});
	};

	const handlePressEnd = async () => {
		setLoading(true);
		const { title, confirm, cancel } = confirmEnd;
		showConfirmModal({
			modalId: 'confirm-end-trip',
			title: title,
			confirmText: confirm,
			cancelText: cancel,
			mainAction: 'cancel',
			onConfirm: async () => {
				await mapActions.endCurrentTrip();
				setLoading(false);
			},
			onClose: () => {
				setLoading(false);
			},
			onReject: () => {
				setLoading(false);
			},
		});
	};

	useEffect(() => {
		if (!currentTrip) showStartTripBottomSheet();
	}, []);

	return (
		<View style={[styles.container, { bottom }]}>
			{loading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size={'large'} />
				</View>
			) : !currentTrip ? (
				<TouchableOpacity
					style={[styles.button, styles.startButton]}
					onPress={handlePressStart}
				>
					<Text style={styles.startButtonText}>{startButton}</Text>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					style={[styles.button, styles.endButton]}
					onPress={handlePressEnd}
				>
					<Text style={styles.endButtonText}>{endButton}</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default TripActions;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		paddingHorizontal: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 14,
	},
	loadingContainer: {
		width: 80,
		height: 80,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		width: 80,
		height: 80,
		borderRadius: 40,
		justifyContent: 'center',
		alignItems: 'center',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.8,
		shadowRadius: 3,
		elevation: -2,
		objectFit: 'cover',
	},
	startButton: {
		shadowColor: defaultTheme.cta100,
		backgroundColor: defaultTheme.cta100,
	},
	startButtonText: {
		fontSize: 16,
		fontWeight: '600',
		color: defaultTheme.textLight,
	},
	endButton: {
		shadowColor: defaultTheme.textDark30,
		backgroundColor: defaultTheme.textDark10,
	},
	endButtonText: {
		fontSize: 16,
		fontWeight: '600',
		color: defaultTheme.textDark90,
	},
});
