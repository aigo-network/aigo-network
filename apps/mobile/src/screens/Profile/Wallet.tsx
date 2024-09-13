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
import { showAskPasscodeBottomSheet } from 'modals/AskPasscode';
import { appActions, appState } from 'state/app';
import { setEncryptedPrivateKey, setWalletAddress } from 'state/app/wallet';
import { defaultTheme } from 'utils/global';
import { useSnapshot } from 'valtio';

export const Wallet = () => {
	const { wallet } = useSnapshot(appState);

	const newPasscode = useRef('');
	const setChangeError = useRef<(error: string) => void>(() => ({}));
	const [createLoading, setCreateLoading] = useState(false);

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
					setCreateLoading(true);
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

			await Promise.all([
				setWalletAddress(wallet.address),
				setEncryptedPrivateKey(encryptedPrivateKey),
			]);

			appActions.setWallet(wallet.address);
			setCreateLoading(false);
		} catch (error) {
			crashlytics().recordError(error as Error, 'createWalletError');
			console.debug('createWalletError', error);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Wallet</Text>
				{!wallet && !createLoading && (
					<TouchableOpacity
						style={styles.createButton}
						hitSlop={14}
						onPress={handlePressCreate}
					>
						<Text>Create</Text>
					</TouchableOpacity>
				)}
				{createLoading && <ActivityIndicator color={defaultTheme.textDark80} />}
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
	createButton: {
		padding: 7,
		paddingHorizontal: 26,
		borderRadius: 20,
		backgroundColor: defaultTheme.cta100,
	},
});
