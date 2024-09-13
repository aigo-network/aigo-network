import { mnemonicToSeedSync } from 'bip39';

import {
	decryptPrivateKeyHex,
	deriveKeypair,
	encryptPrivateKeyHex,
} from './wallet';

describe('test wallet', () => {
	const mnemonic =
		'program chest inhale jump dance success pole suffer zero pill wild message';
	const seed = new Uint8Array(mnemonicToSeedSync(mnemonic));

	const expectedPublicKey = '0x62c274E28AEE6C6c62B5e81B8b52E6cA7350cb5D';

	it('keypair from seedphrase', async () => {
		const wallet = deriveKeypair(seed, 'evm');
		expect(wallet.address).toEqual(expectedPublicKey);
	});

	it('encrypt/decrypt ethers wallet private key', async () => {
		const wallet = deriveKeypair(seed, 'evm');
		const privateKey = wallet.privateKey;
		const encrypted = await encryptPrivateKeyHex(privateKey, 'helloworld');
		const decrypted = await decryptPrivateKeyHex(encrypted, 'helloworld');
		expect(privateKey).toEqual(decrypted);
	});

	it('encrypt/decrypt ethers wallet private key wrong passcode', async () => {
		try {
			const wallet = deriveKeypair(seed, 'evm');
			const privateKey = wallet.privateKey;
			const encrypted = await encryptPrivateKeyHex(privateKey, 'helloworld');
			await decryptPrivateKeyHex(encrypted, 'helloworld2');
		} catch (err) {
			const errMessage = (err as Error).message;
			expect(errMessage).toEqual(
				'The operation failed for an operation-specific reason',
			);
		}
	});
});
