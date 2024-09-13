import { useRef, useState } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import {
	createSafeWalletWithPasscode,
	encryptPrivateKeyHex,
} from '@aigo/crypto';
import crashlytics from '@react-native-firebase/crashlytics';
import CopyButton from 'components/CopyButton';
import { ethers } from 'ethers';
import { showAskPasscodeBottomSheet } from 'modals/AskPasscode';
import { appActions, appState } from 'state/app';
import { setEncryptedPrivateKey } from 'state/app/wallet';
import { defaultTheme } from 'utils/global';
import { smartGetPrivateKey } from 'utils/wallet';
import { useSnapshot } from 'valtio';

export const Wallet = () => {
	const user = useSnapshot(appState).appUser;
	const wallet = user?.wallet;

	const newPasscode = useRef('');
	const setChangeError = useRef<(error: string) => void>(() => ({}));
	const [loading, setLoading] = useState(false);

	const handlePressCreate = () => {
		const { cleanModal } = showAskPasscodeBottomSheet({
			title: 'Enter new passcode',
			description:
				"Keep this passcode safe; you'll need it to recover your wallet.",
			onComplete: (passcode) => {
				newPasscode.current = passcode;
				cleanModal();
				confirmPasscode();
			},
		});
	};

	const confirmPasscode = () => {
		const { cleanModal } = showAskPasscodeBottomSheet({
			idSuffix: 'confirm',
			title: 'Confirm passcode',
			description: 'Enter passcode to confirm',
			onComplete: (passcode) => {
				if (passcode === newPasscode.current) {
					console.debug('passcode matched');
					setLoading(true);
					createWallet();
					cleanModal();
				} else {
					console.debug('passcode did not match');
					setChangeError.current('wrong passcode');
				}
			},
			setChangeErrorFunction: (setChangeErrorFunc) => {
				setChangeError.current = setChangeErrorFunc;
			},
		});
	};

	const createWallet = async () => {
		const passcode = newPasscode.current;
		if (passcode.length !== 6) throw Error('invalid passcode length');

		try {
			const { wallet } = await createSafeWalletWithPasscode(passcode);

			const encryptedPrivateKey = await encryptPrivateKeyHex(
				wallet.privateKey,
				passcode,
			);

			await setEncryptedPrivateKey(encryptedPrivateKey);

			appActions.setWallet(wallet.address);
			setLoading(false);
		} catch (error) {
			crashlytics().recordError(error as Error, 'createWalletError');
			console.debug('createWalletError', error);
		}
	};

	// dev only
	const handleReconstructEncrypted = async () => {
		setLoading(true);
		const privateKey = await smartGetPrivateKey();
		const wallet = new ethers.Wallet(privateKey);
		console.log('Reconstructed wallet', wallet);
		setLoading(false);
	};

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Wallet</Text>
				{!wallet && !loading && (
					<TouchableOpacity
						style={styles.button}
						hitSlop={14}
						onPress={handlePressCreate}
					>
						<Text>Create</Text>
					</TouchableOpacity>
				)}
				{loading && <ActivityIndicator color={defaultTheme.textDark80} />}
				{wallet && __DEV__ && (
					<TouchableOpacity
						style={styles.button}
						hitSlop={14}
						onPress={handleReconstructEncrypted}
					>
						<Text>Decrypt</Text>
					</TouchableOpacity>
				)}
			</View>

			{wallet && (
				<View style={styles.walletContainer}>
					<Text style={styles.walletText} numberOfLines={1}>
						{wallet}
					</Text>
					<CopyButton value={wallet} />
				</View>
			)}
		</View>
	);
};

export default Wallet;

const styles = StyleSheet.create({
	container: {
		marginTop: 32,
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
		color: defaultTheme.textDark90,
	},
	walletContainer: {
		gap: 16,
		marginTop: 12,
		flexDirection: 'row',
		alignItems: 'center',
	},
	walletText: {
		flex: 1,
		fontSize: 16,
		color: defaultTheme.textDark70,
	},
	button: {
		padding: 7,
		paddingHorizontal: 26,
		borderRadius: 20,
		backgroundColor: defaultTheme.cta100,
	},
});
