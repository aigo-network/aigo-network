import type { FC } from 'react';
import { useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';

import Button from '@/components/Button';

const InputCode: FC = () => {
	const [code, setCode] = useState('');
	const [error, setError] = useState('');
	const onContinuePress = () => {
		console.log('code >>>', code);
		setError('Invalid code. Please try again.');
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={[
					styles.input,
					Platform.OS === 'web' && { outlineWidth: 0 },
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
	},
	activeBtnText: {
		color: '#232529',
	},
});
