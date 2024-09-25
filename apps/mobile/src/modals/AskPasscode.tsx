import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useAnimatedKeyboard } from 'react-native-reanimated';
import BottomSheetContainer from '@aigo/components/BottomSheetContainer';
import OtpInput from 'components/OtpInput';
import { Align, showModal } from 'empty-modal/state';
import { defaultTheme } from 'utils/global';

type AskPasscodeOption = Props & {
	idSuffix?: string;
};

export const showAskPasscodeBottomSheet = (options?: AskPasscodeOption) => {
	const { cleanModal } = showModal(
		<AskPasscode
			{...options}
			onClose={() => {
				options?.onClose?.();
				cleanModal();
			}}
		/>,
		{
			id: ['ask-passcode-bottom-sheet', options?.idSuffix].join('-'),
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
	setChangeErrorFunction?: (callback: (error: string) => void) => void;
};

const AskPasscode: FC<Props> = ({
	title,
	description,
	onComplete,
	onClose,
	setChangeErrorFunction,
}) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [passcode, setPasscode] = useState('');

	useAnimatedKeyboard();
	useEffect(() => {
		if (passcode.length === 6) {
			onComplete?.(passcode);
			setLoading(true);
		} else if (passcode.length > 0) {
			setError('');
		}
	}, [passcode]);

	useEffect(() => {
		setChangeErrorFunction?.(setError);
	}, []);

	useEffect(() => {
		if (error.length > 0) {
			setPasscode('');
			setLoading(false);
		}
	}, [error]);

	return (
		<BottomSheetContainer style={[styles.container]} onClose={onClose}>
			<View style={styles.indicator} />
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.description}>{description}</Text>
			{loading ? (
				<ActivityIndicator color={defaultTheme.textDark60} />
			) : (
				<OtpInput
					inputLength={6}
					value={passcode}
					onChangeText={setPasscode}
					errorMessage={error}
					hideValue
					autoFocus
				/>
			)}
		</BottomSheetContainer>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 640,
		paddingHorizontal: 20,
		paddingTop: 14,
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
