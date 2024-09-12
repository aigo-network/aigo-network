import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomSheetContainer from '@aigo/components/BottomSheetContainer';
import OtpInput from 'components/OtpInput';
import { Align, showModal } from 'empty-modal/state';
import { defaultTheme } from 'utils/global';

type AskPasscodeOption = Omit<Props, 'onClose'>;

export const showAskPasscodeBottomSheet = (options?: AskPasscodeOption) => {
	const { cleanModal } = showModal(
		<AskPasscode onClose={() => cleanModal()} {...options} />,
		{
			id: 'ask-passcode-bottom-sheet',
			align: Align.FullBottom,
			showBackdrop: true,
		},
	);

	return { cleanModal };
};

type Props = {
	title?: string;
	description?: string;
	onClose?: () => void;
	onComplete?: (passcode: string) => void;
};

const AskPasscode: FC<Props> = ({
	title,
	description,
	onComplete,
	onClose,
}) => {
	const [passcode, setPasscode] = useState('');

	useEffect(() => {
		if (passcode.length === 6) {
			onComplete?.(passcode);
		}
	}, [passcode]);

	return (
		<BottomSheetContainer style={[styles.container]} onClose={onClose}>
			<View style={styles.indicator} />
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.description}>{description}</Text>
			<OtpInput
				inputLength={6}
				value={passcode}
				onChangeText={setPasscode}
				hideValue
				autoFocus
			/>
		</BottomSheetContainer>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingTop: 14,
		paddingBottom: 400,
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
	title: {
		fontSize: 24,
		fontWeight: '500',
		color: defaultTheme.textDark100,
		marginTop: 16,
		marginBottom: 12,
	},
	description: {
		fontSize: 16,
		color: defaultTheme.textDark60,
		marginBottom: 32,
	},
});
