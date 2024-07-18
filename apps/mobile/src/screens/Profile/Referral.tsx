import { useState } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { graphqlClient } from '@aigo/api/graphql';
import { Button } from '@aigo/components/Button';
import { config } from '@aigo/config';
import analytics from '@react-native-firebase/analytics';
import { appActions, appState } from 'state/app';
import { useSnapshot } from 'valtio';

import { showReferralPoint } from './shared';

export const Referral = () => {
	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const { content } = useSnapshot(appState);
	const referralContent = content.screens.profile.referralSection;

	const handleInputInvitationCode = async () => {
		if (!code) return;
		setLoading(true);
		try {
			await graphqlClient.inputInvitationCode({ code });
			appActions.queryAndUpdateGOPoints();
			showReferralPoint();
			analytics().logEvent('verify_invitation_code');
		} catch (error) {
			setError(referralContent.invalidCodeError);
		}
		setLoading(false);
	};

	const handleChangeText = (text: string) => {
		setCode(text);
		setError('');
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{referralContent.title}</Text>
			<Text style={styles.descriptionText}>
				{referralContent.descriptionPrefix}{' '}
				<Text style={styles.pointText}>
					{config.activity.InviteFriend.points} GO{' '}
				</Text>
				{referralContent.descriptionSuffix}
			</Text>

			<View style={styles.inputContainer}>
				<TextInput
					style={[styles.codeInput, error !== '' && styles.errorCodeInput]}
					value={code}
					onChangeText={handleChangeText}
					placeholder={referralContent.enterCodePlaceholder}
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
						{referralContent.verifyButton}
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
