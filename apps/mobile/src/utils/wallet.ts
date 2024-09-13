import { decryptPrivateKeyHex } from '@aigo/crypto';
import { showAskPasscodeBottomSheet } from 'modals/AskPasscode';
import { getEncryptedPrivateKey } from 'state/app/wallet';

export const smartGetPrivateKey = async (): Promise<string> => {
	const storedPk = await getEncryptedPrivateKey();
	let setError: (text: string) => void;

	return new Promise((resolve, reject) => {
		if (!storedPk) {
			/**
			 * Recover from remote secret shares
			 */
			console.log('Recover from remote secret shares');
		} else {
			/**
			 * Recover encrypted private key from storage
			 */
			const { cleanModal } = showAskPasscodeBottomSheet({
				title: 'Enter passcode',
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
		}
	});
};
