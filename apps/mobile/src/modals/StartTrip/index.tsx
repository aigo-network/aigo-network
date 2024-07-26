import type { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheetContainer from '@aigo/components/BottomSheetContainer';
import { Align, showModal } from 'empty-modal/state';

import Card from './Card';

export const showStartTripBottomSheet = () => {
	const { cleanModal } = showModal(
		<StartTripBottomSheet onClose={() => cleanModal()} />,
		{
			id: 'start-trip-bottom-sheet',
			align: Align.FullBottom,
			showBackdrop: true,
		},
	);

	return { cleanModal };
};

type Props = {
	onClose?: () => void;
};

const StartTripBottomSheet: FC<Props> = ({ onClose }) => {
	const { bottom } = useSafeAreaInsets();

	return (
		<BottomSheetContainer
			style={[styles.container, { paddingBottom: bottom }]}
			onClose={onClose}
			closeOffset={100}
		>
			<View style={styles.indicator} />

			<View style={styles.titleContainer}>
				<Text style={styles.title}>Just take you a second ...</Text>
			</View>

			<View style={styles.separateLine} />

			<View style={styles.contentContainer}>
				<View>
					<Text style={styles.subtitle}>You are</Text>
					<View style={styles.infoContainer}>
						<Card style={styles.infoItem} title="Driver" />
						<Card style={styles.infoItem} title="Rider" />
					</View>
				</View>
				<View>
					<Text style={styles.subtitle}>Your purpose is</Text>
					<View style={styles.infoContainer}>
						<Card style={styles.infoItem} title="Go to work" />
						<Card style={styles.infoItem} title="Hang out" />
					</View>
				</View>

				<TouchableOpacity style={styles.continueButton}>
					<Text style={styles.continueButtonTitle}>Continue</Text>
				</TouchableOpacity>
			</View>
		</BottomSheetContainer>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 14,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	indicator: {
		alignSelf: 'center',
		width: 40,
		height: 4,
		borderRadius: 2,
		backgroundColor: '#D9D9D9',
	},
	titleContainer: {
		marginVertical: 20,
		paddingHorizontal: 20,
	},
	title: {
		fontSize: 18,
		lineHeight: 24,
		fontWeight: '600',
		color: '#171717',
	},
	separateLine: {
		height: 2,
		borderRadius: 2,
		backgroundColor: '#F1F2F3',
	},
	contentContainer: {
		paddingHorizontal: 20,
	},
	subtitle: {
		fontWeight: '600',
		color: '#171717',
		marginTop: 24,
		marginBottom: 14,
	},
	infoContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 14,
	},
	infoItem: {
		flex: 1,
	},
	continueButton: {
		padding: 16,
		borderRadius: 46,
		backgroundColor: '#171717',
		marginTop: 32,
	},
	continueButtonTitle: {
		fontSize: 16,
		fontWeight: '600',
		textAlign: 'center',
	},
});
