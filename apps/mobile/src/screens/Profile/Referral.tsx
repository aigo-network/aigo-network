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
import { defaultTheme } from 'utils/global';
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
					<Text style={[styles.verifyButtonText]}>
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
		color: defaultTheme.textDark90,
	},
	descriptionText: {
		color: defaultTheme.textDark70,
		marginVertical: 8,
	},
	pointText: {
		color: defaultTheme.cta100,
		fontWeight: '600',
	},
	inputContainer: {
		marginBottom: 14,
	},
	codeInput: {
		backgroundColor: defaultTheme.bgLight,
		padding: 16,
		borderRadius: 30,
		textAlign: 'center',
		color: defaultTheme.textDark90,
		fontSize: 18,
		borderWidth: 1,
		borderColor: defaultTheme.inputBorder,
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
		color: defaultTheme.red,
	},
	errorCodeInput: {
		borderColor: defaultTheme.red,
	},
	loadingContainer: {
		paddingTop: 16,
		paddingBottom: 17,
	},
	verifyButton: {
		backgroundColor: defaultTheme.textDark90,
		paddingVertical: 15,
		borderRadius: 50,
	},
	disableButton: {
		opacity: 0.1,
	},
	verifyButtonText: {
		fontWeight: '500',
		fontSize: 19,
		color: defaultTheme.textLight,
	},
});
