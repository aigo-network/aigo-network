import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheetContainer from '@aigo/components/BottomSheetContainer';
import { Align, showModal } from 'empty-modal/state';
import { appState } from 'state/app';
import { mapActions } from 'state/map';
import { useSnapshot } from 'valtio';

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
	const { content } = useSnapshot(appState);
	const [userType, setUserType] = useState<CardInfo | null>(null);
	const [purpose, setPurpose] = useState<CardInfo | null>(null);

	const disableContinue = !userType || !purpose;

	const {
		title,
		userTypeTitle,
		userTypes,
		purposeTitle,
		purposes,
		continueButton,
	} = content.modal.startTripBottomSheet;

	const mappedUserTypes = useMemo(() => {
		return userTypes.map((t) => ({ title: t }));
	}, [userTypes]);

	const mappedPurposes = useMemo(() => {
		return purposes.map((t) => ({ title: t }));
	}, [purposes]);

	const handleContinue = () => {
		if (disableContinue) return;

		mapActions.setStartTripMetadata({
			userType: userType.title,
			purpose: purpose.title,
		});

		onClose?.();
	};

	return (
		<BottomSheetContainer
			style={[styles.container, { paddingBottom: bottom }]}
			onClose={onClose}
			closeOffset={100}
		>
			<View style={styles.indicator} />

			<View style={styles.titleContainer}>
				<Text style={styles.title}>{title}</Text>
			</View>

			<View style={styles.separateLine} />

			<View style={styles.contentContainer}>
				<View>
					<Text style={styles.subtitle}>{userTypeTitle}</Text>
					<RadioCards
						cards={mappedUserTypes}
						selectedCard={userType}
						onSelect={setUserType}
					/>
				</View>
				<View>
					<Text style={styles.subtitle}>{purposeTitle}</Text>
					<RadioCards
						cards={mappedPurposes}
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
					onPress={handleContinue}
				>
					<Text style={styles.continueButtonTitle}>{continueButton}</Text>
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
	disableContinueButton: {
		opacity: 0.4,
	},
	continueButtonTitle: {
		fontSize: 16,
		fontWeight: '600',
		textAlign: 'center',
	},
});
