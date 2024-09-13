import { graphqlClient } from '@aigo/api/graphql';
import {
	aes,
	decryptPrivateKeyHex,
	encryptPrivateKeyHex,
	reconstructSeedphraseAndWallet,
} from '@aigo/crypto';
import bs58 from 'bs58';
import { showAskPasscodeBottomSheet } from 'modals/AskPasscode';
import {
	getEncryptedPrivateKey,
	setEncryptedPrivateKey,
} from 'state/app/wallet';

/**
 * Ask for passcode and construct private key.
 * If no stored encrypted private key, this function will fetch secret shares
 * from backend to reconstruct the seedphrase, and then derive the private key
 */
export const smartGetPrivateKey = async (): Promise<string> => {
	const storedPk = await getEncryptedPrivateKey();
	let setError: (text: string) => void;

	if (!storedPk) {
		/**
		 * Recover from remote secret shares
		 */
		const { secretShares: shares } = await graphqlClient.getSecretShares();
		if (!shares) throw Error('Can not fetch secret shares');

		const encryptedShare = shares.find((s) => s?.type === 'PASSCODE_ENCRYPTED');
		const primaryShare = shares.find((s) => s?.type === 'PRIMARY');
		if (!encryptedShare || !primaryShare)
			throw Error('Required 2 shares to reconstruct');

		const encryptedShareBytes = bs58.decode(encryptedShare.data as string);
		const primaryShareBytes = bs58.decode(primaryShare.data as string);

		return new Promise((resolve, reject) => {
			const { cleanModal } = showAskPasscodeBottomSheet({
				title: 'Enter passcode',
				description: 'Your passcode is required to make transaction',
				idSuffix: 'decrypt-private-key',
				setChangeErrorFunction: (cb) => (setError = cb),
				onComplete: async (passcode) => {
					let passShareBytes: Uint8Array;

					try {
						passShareBytes = await aes.separateAndDecrypt(
							encryptedShareBytes,
							passcode,
						);
					} catch (error) {
						setError('Wrong passcode');
						return;
					}

					try {
						const { wallet } = reconstructSeedphraseAndWallet([
							passShareBytes,
							primaryShareBytes,
						]);

						/**
						 * store encrypted private key for the next usage
						 */
						const encryptedPrivateKey = await encryptPrivateKeyHex(
							wallet.privateKey,
							passcode,
						);
						await setEncryptedPrivateKey(encryptedPrivateKey);

						resolve(wallet.privateKey);
						cleanModal();
					} catch (error) {
						setError('Failed to reconstruct your wallet');
					}
				},
				onClose: () => {
					reject('No passcode');
				},
			});

			console.log('Recover from remote secret shares');
		});
	} else {
		/**
		 * Recover encrypted private key from storage
		 */
		return new Promise((resolve, reject) => {
			const { cleanModal } = showAskPasscodeBottomSheet({
				title: 'Enter passcode',
				description: 'Your passcode is required to make transaction',
				idSuffix: 'decrypt-private-key',
				setChangeErrorFunction: (cb) => (setError = cb),
				onComplete: async (passcode) => {
					try {
						const privateKey = await decryptPrivateKeyHex(storedPk, passcode);
						resolve(privateKey);
						cleanModal();
					} catch (error) {
						setError('Wrong passcode');
					}
				},
				onClose: () => {
					reject('No passcode');
				},
			});
		});
	}
};
