import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'components/Button';

export const Referral = () => {
	const [code, setCode] = useState('');
	const handleInputInvitationCode = () => {};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Referral code</Text>
			<Text style={styles.descriptionText}>
				Receive extra <Text style={styles.pointText}>50 GO </Text>
				when entering your friend’s referral code
			</Text>
			<TextInput
				style={styles.codeInput}
				value={code}
				onChangeText={setCode}
				placeholder="enter referral code"
				placeholderTextColor={'#C1C1C1'}
				textAlign="center"
			/>

			<Button
				style={[styles.verifyButton, !code && styles.disableButton]}
				onPress={handleInputInvitationCode}
				disabled={!code}
			>
				<Text
					style={[styles.verifyButtonText, !code && styles.disableButtonText]}
				>
					Share with friends
				</Text>
			</Button>
		</View>
	);
};

export default Referral;

const styles = StyleSheet.create({
	container: {
		marginTop: 30,
		gap: 14,
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
		color: '#000',
	},
	descriptionText: {
		color: '#6C6764',
	},
	pointText: {
		color: '#6740FF',
		fontWeight: '600',
	},
	codeInput: {
		backgroundColor: '#FFFFFF',
		padding: 16,
		borderRadius: 30,
		textAlign: 'center',
		color: '#000',
		fontSize: 18,
	},
	verifyButton: {
		backgroundColor: '#a0fa82',
		paddingVertical: 15,
		borderRadius: 50,
	},
	disableButton: {
		backgroundColor: '#DDDDDD',
	},
	verifyButtonText: {
		fontWeight: '500',
		fontSize: 19,
		color: '#6740FF',
	},
	disableButtonText: {
		color: '#878787',
	},
});
