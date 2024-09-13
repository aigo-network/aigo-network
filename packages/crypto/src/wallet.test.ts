import { mnemonicToSeedSync } from 'bip39';

import { deriveKeypair } from './wallet';

describe('test wallet', () => {
	const mnemonic =
		'program chest inhale jump dance success pole suffer zero pill wild message';
	const seed = new Uint8Array(mnemonicToSeedSync(mnemonic));

	const expectedPublicKey = '0x62c274E28AEE6C6c62B5e81B8b52E6cA7350cb5D';

	it('keypair from seedphrase', async () => {
		const wallet = deriveKeypair(seed, 'evm');
		expect(wallet.address).toEqual(expectedPublicKey);
	});
});
