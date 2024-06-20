import type { FC } from 'react';
import { useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { graphqlClient } from '@aigo/api/graphql';

import Button from '@/components/Button';
import { appState } from '@/state/app';

interface Props {
	handleClose: () => void;
}

const InputCode: FC<Props> = ({ handleClose }) => {
	const [code, setCode] = useState('');
	const [error, setError] = useState('');
	const onContinuePress = async () => {
		try {
			await graphqlClient.web3FarmingInitProfile({ referralCode: code });

			const { user, web3FarmingProfile } =
				await graphqlClient.getUserWithWeb3FarmingProfile();
			if (web3FarmingProfile?.id) {
				appState.user = user as never;
				appState.web3FarmingProfile = web3FarmingProfile;
				handleClose();
			}
		} catch (err) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const message = (err as any)?.response?.errors?.[0]?.message;
			const capitalizeMess =
				(message as string)[0].toUpperCase() + (message as string).slice(1);
			setError(capitalizeMess);
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={[
					styles.input,
					Platform.OS === 'web' && ({ outlineWidth: 0 } as never),
					!!error && styles.errorInput,
				]}
				onChangeText={setCode}
			/>

			{!!error && <Text style={styles.errorText}>{error}</Text>}
			<Button
				style={[styles.btn, !!code && styles.activeBtn]}
				onPress={onContinuePress}
			>
				<Text style={[styles.btnText, !!code && styles.activeBtnText]}>
					Continue
				</Text>
			</Button>
		</View>
	);
};

export default InputCode;

const styles = StyleSheet.create({
	container: {
		gap: 16,
	},
	input: {
		fontSize: 32,
		fontWeight: '500',
		lineHeight: 40,
		color: '#232529',
		textAlign: 'center',
		backgroundColor: '#f2f2f2',
		paddingVertical: 40,
		borderRadius: 10,
	},
	errorInput: {
		borderWidth: 1,
		borderColor: '#e15050',
		backgroundColor: '#ffeaee',
	},
	errorText: {
		fontSize: 16,
		lineHeight: 24,
		textAlign: 'center',
		color: '#e15050',
	},
	btn: {
		backgroundColor: '#f2f2f2',
		alignItems: 'center',
		justifyContent: 'center',
	},
	activeBtn: {
		backgroundColor: '#81ddfb',
	},
	btnText: {
		color: '#9c9d9f',
		fontSize: 16,
		fontWeight: '500',
	},
	activeBtnText: {
		color: '#232529',
	},
});
