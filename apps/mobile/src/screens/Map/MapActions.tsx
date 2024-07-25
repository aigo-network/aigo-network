import { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppButton from '@aigo/components/AppButton';
import ChevronLeft from '@aigo/components/icon/ChevronLeft';
import { useNavigation } from '@react-navigation/native';
import { showConfirmModal } from 'modals/Confirm';
import { mapActions, useMapState } from 'state/map';

import { useBouncedMapInsets } from './shared';

export const MapActions = () => {
	const { goBack } = useNavigation();
	const { safeInsets } = useBouncedMapInsets();
	const { bottom } = safeInsets;
	const { currentTrip: currentRoute } = useMapState();
	const [loading, setLoading] = useState(false);

	const handlePressStart = async () => {
		setLoading(true);
		showConfirmModal({
			modalId: 'confirm-start-trip',
			message: 'Ready? Go and get GO Points',
			yesText: 'GO now',
			noText: 'Close',
			mainAction: 'yes',
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
		showConfirmModal({
			modalId: 'confirm-end-trip',
			message: 'Are you sure to end this trip?',
			yesText: 'Confirm',
			noText: 'Close',
			mainAction: 'no',
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

	return (
		<View style={[styles.container, { bottom }]}>
			<TouchableOpacity hitSlop={14} onPress={goBack}>
				<ChevronLeft width={28} color={'#6c6c6c'} strokeWidth="3" />
			</TouchableOpacity>

			{loading ? (
				<ActivityIndicator size={'large'} />
			) : !currentRoute ? (
				<AppButton
					style={styles.button}
					title="Start"
					onPress={handlePressStart}
				/>
			) : (
				<AppButton
					style={styles.button}
					title="End your journey"
					onPress={handlePressEnd}
				/>
			)}
		</View>
	);
};

export default MapActions;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		paddingHorizontal: 20,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 14,
	},
	button: {
		flex: 1,
	},
});
