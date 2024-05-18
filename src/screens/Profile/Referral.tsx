import { useState } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { graphqlClient } from 'api/graphql';
import { Button } from 'components/Button';

import { showReferralPoint } from './shared';

export const Referral = () => {
	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleInputInvitationCode = async () => {
		if (!code) return;
		setLoading(true);
		try {
			await graphqlClient.inputInvitationCode({ code });
			showReferralPoint();
		} catch (error) {
			setError('Code is not valid. Please try again');
		}
		setLoading(false);
	};

	const handleChangeText = (text: string) => {
		setCode(text);
		setError('');
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Referral code</Text>
			<Text style={styles.descriptionText}>
				Receive extra <Text style={styles.pointText}>50 GO </Text>
				when entering your friend’s referral code
			</Text>

			<View style={styles.inputContainer}>
				<TextInput
					style={[styles.codeInput, error !== '' && styles.errorCodeInput]}
					value={code}
					onChangeText={handleChangeText}
					placeholder="enter referral code"
					placeholderTextColor={'#C1C1C1'}
					textAlign="center"
				/>
				<View style={styles.errorContainer}>
					{error && <Text style={styles.errorText}>{error}</Text>}
				</View>
			</View>

			{loading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator />
				</View>
			) : (
				<Button
					style={[styles.verifyButton, !code && styles.disableButton]}
					onPress={handleInputInvitationCode}
					disabled={!code}
				>
					<Text
						style={[styles.verifyButtonText, !code && styles.disableButtonText]}
					>
						Verify now
					</Text>
				</Button>
			)}
		</View>
	);
};

export default Referral;

const styles = StyleSheet.create({
	container: {
		marginTop: 30,
		gap: 6,
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
		color: '#000',
	},
	descriptionText: {
		color: '#6C6764',
		marginVertical: 8,
	},
	pointText: {
		color: '#6740FF',
		fontWeight: '600',
	},
	inputContainer: {
		marginBottom: 14,
	},
	codeInput: {
		backgroundColor: '#FFFFFF',
		padding: 16,
		borderRadius: 30,
		textAlign: 'center',
		color: '#000',
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#eaeaea',
	},
	errorContainer: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: -17,
	},
	errorText: {
		fontSize: 14,
		textAlign: 'center',
		color: '#D84A4A',
	},
	errorCodeInput: {
		borderColor: '#D84A4A',
	},
	loadingContainer: {
		paddingTop: 16,
		paddingBottom: 17,
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
