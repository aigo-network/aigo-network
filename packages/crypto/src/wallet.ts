/**
 * For wallet keypair compatibility, we use bip44 which is commonly used in networks or wallet apps
 * - bip44 spec: https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
 * - Metamask support: https://support.metamask.io/managing-my-wallet/secret-recovery-phrase-and-private-keys/importing-a-seed-phrase-from-another-wallet-software-derivation-path/
 */
import * as secp from '@bitcoinerlab/secp256k1';
import BIP32Factory from 'bip32';
import bs58 from 'bs58';
import { ec } from 'elliptic';
import { ethers } from 'ethers';

import { aes } from './aes';

const secp256k1Bip32 = BIP32Factory(secp);
const secp256k1EC = new ec('secp256k1');

export const derivationPaths = {
	evm: "m/44'/60'/0'/0/0",
} as const;

type DerivationType = keyof typeof derivationPaths;

export const deriveRawKeypair = (
	seed: Uint8Array,
	type: DerivationType,
): ec.KeyPair => {
	if (!derivationPaths[type]) throw Error('Unsupported derivation type');

	switch (type) {
		case 'evm': {
			const rootSeed = secp256k1Bip32.fromSeed(seed);
			const derivedKey = rootSeed.derivePath(derivationPaths[type]);
			if (!derivedKey.privateKey) throw Error('Can not derive key from seed');
			const keypair = secp256k1EC.keyFromPrivate(derivedKey.privateKey);

			return keypair;
		}
	}
};

type DerivedKeypairTypes = {
	evm: ethers.Wallet;
};

export const deriveKeypair = <T extends DerivationType>(
	seed: Uint8Array,
	type: T,
): DerivedKeypairTypes[T] => {
	if (!derivationPaths[type]) throw Error('Unsupported derivation type');

	const keypair = deriveRawKeypair(seed, type);

	switch (type) {
		case 'evm': {
			const privateKey = keypair.getPrivate().toString('hex');
			const wallet = new ethers.Wallet(`0x${privateKey}`);

			return wallet;
		}
	}

	throw Error('Unsupported derivation type');
};

export const encryptPrivateKeyHex = async (
	privateKey: string,
	passcode: string,
) => {
	const trimPrivateKey = privateKey.replace('0x', '');
	const privateKeyBytes = new Uint8Array(Buffer.from(trimPrivateKey, 'hex'));
	const encrypted = await aes.encryptAndMerge(privateKeyBytes, passcode);

	return bs58.encode(encrypted);
};

export const decryptPrivateKeyHex = async (
	encrypted: string,
	passcode: string,
) => {
	const encryptedBytes = bs58.decode(encrypted);
	const privateKey = await aes.separateAndDecrypt(encryptedBytes, passcode);
	const privateKeyHex = Buffer.from(privateKey).toString('hex');

	return `0x${privateKeyHex}`;
};
