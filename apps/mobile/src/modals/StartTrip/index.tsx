import type { FC } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheetContainer from '@aigo/components/BottomSheetContainer';
import { Align, showModal } from 'empty-modal/state';

import type { CardInfo } from './RadioCards';
import RadioCards from './RadioCards';

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
	const [job, setJob] = useState<CardInfo | null>(null);
	const [purpose, setPurpose] = useState<CardInfo | null>(null);

	const disableContinue = !job || !purpose;

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
					<RadioCards cards={jobs} selectedCard={job} onSelect={setJob} />
				</View>
				<View>
					<Text style={styles.subtitle}>Your purpose is</Text>
					<RadioCards
						cards={purposes}
						selectedCard={purpose}
						onSelect={setPurpose}
					/>
				</View>

				<TouchableOpacity
					style={[
						styles.continueButton,
						disableContinue && styles.disableContinueButton,
					]}
					disabled={disableContinue}
				>
					<Text style={styles.continueButtonTitle}>Continue</Text>
				</TouchableOpacity>
			</View>
		</BottomSheetContainer>
	);
};

const jobs: CardInfo[] = [
	{
		title: 'Driver',
	},
	{
		title: 'Rider',
	},
];

const purposes: CardInfo[] = [
	{
		title: 'Go to work',
	},
	{
		title: 'Hang out',
	},
];

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
	disableContinueButton: {
		opacity: 0.4,
	},
	continueButtonTitle: {
		fontSize: 16,
		fontWeight: '600',
		textAlign: 'center',
	},
});
