/**
 * 1. Description
 * We store users' seed phrases using the threshold key encryption technique, which incorporates
 * Shamir's Secret Sharing and additional encryption algorithms.
 *
 * The secret (seed phrase) will be split into shares and distributed/stored as follows:
 * - Share A will be encrypted using RSA with API public key stored in our backend.
 * - Share B will be encrypted with the user’s passcode, then encrypted again by RSA as described above
 *   and stored in our backend. Additionally, this encrypted share will also be stored on the user's device.
 *
 * With a threshold of 2, users need at least 2 shares to reconstruct the secret.
 *
 * In normal cases, the user will have a key share fetched from the Rocket API, which is only available at runtime.
 * The other key share is stored on the device. If a transaction signing is required, we will prompt the user for their
 * passcode to reconstruct the share. With enough shares, we can then reconstruct the seed phrase and derive the private
 * key for signing purposes.
 *
 * When signing in from a new device, the app needs to fetch 2 key shares from the backend and use the passcode to
 * reconstruct one share, allowing the secret to be reconstructed.
 *
 *
 * 2. Considerations
 * This threshold key encryption method is considered a semi-custodial wallet. The app and backend cannot reconstruct
 * the user's seed phrase without the user’s passcode. The encrypted shares stored in our backend serve as a secure backup
 * for the seed phrase. However, users may lose access to their keys if our server is discontinued or if they forget
 * their passcode. The distributed shares are bound to the user through their authentication identity, which is linked
 * to Firebase user identity.
 *
 * - On the device side, we could store the seed phrase and private key, encrypting them with a passcode. This would ensure
 *   that the shares stored in the backend function as a secure backup.
 *
 * - We could send a share to the user via email, enhancing self-custody, as they could reconstruct the key without needing
 *   to request a share from the backend. However, this still requires the binding of user shares, which might be resolved
 *   through decentralized storage.
 *
 * - We only temporarily store the passcode-encrypted share; we need to eliminate it by sending it via email or by
 *   requesting an advanced backup from the user.
 *
 *
 * 3. Alternative Approach
 * We could consider using the user's passcode to encrypt the entire seed phrase and store it.
 *
 * This module manages cryptography, encryption depends on @aigo/api, @aigo/config
 */
import { graphqlClient, SecretShareType } from '@aigo/api/graphql';
import { config } from '@aigo/config';
import { sss28 } from '@tanle/shamirs-secret-sharing';
import { generateMnemonic } from 'bip39';
import bs58 from 'bs58';

import { aes } from './aes';
import { rsa } from './rsa';

/**
 * Generate a seedphrase and sync encrypted shares (from threshold key encryption) to backend with passcode.
 */
export const createSafeSeedphraseWithPasscode = async (passcode: string) => {
	const { mnemonic, shares } = await createSeedphraseWithShares(2, 2);
	const primaryShare = shares[0];
	const encryptedShare = await aes.encryptAndMerge(shares[1], passcode);

	await syncSharesToBackend({ primaryShare, encryptedShare });

	return {
		mnemonic,
		shares,
		primaryShare,
		encryptedShare,
	};
};

type SeedphraseWithShares = {
	mnemonic: string;
	shares: sss28.Share[];
};
/**
 * Create new seedphrase and split it by Shamirs's Secret Sharing to achieve threshold key encryption
 */
export const createSeedphraseWithShares = async (
	numShares: number = 2,
	threshold: number = 2,
): Promise<SeedphraseWithShares> => {
	const mnemonic = generateMnemonic();
	const secret = new Uint8Array(Buffer.from(mnemonic, 'utf-8'));

	// took over 3.5s
	// const seed = await mnemonicToSeed(mnemonic);

	// took 2ms
	const shares = sss28.split(secret, threshold, numShares);

	return { mnemonic, shares };
};

type SyncShares = {
	primaryShare: Uint8Array;
	/**
	 * Encrypted by passcode or passkey
	 */
	encryptedShare: Uint8Array;
};
/**
 * Sync the encrypted shares to backend for backup
 */
export const syncSharesToBackend = async ({
	primaryShare,
	encryptedShare,
}: SyncShares) => {
	const publicKeyBytes = bs58.decode(config.API_RSA_PUBLIC_KEY);
	const publicKey = await rsa.importKey(publicKeyBytes, 'public');

	const [encryptedPrimaryShare, encryptedPasscodeShare] = await Promise.all([
		rsa.encrypt(primaryShare, publicKey),
		rsa.encrypt(encryptedShare, publicKey),
	]);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const syncPayload = [
		{
			encrypted: bs58.encode(encryptedPrimaryShare),
			type: SecretShareType.Primary,
		},
		{
			encrypted: bs58.encode(encryptedPasscodeShare),
			type: SecretShareType.PasscodeEncrypted,
		},
	];

	await graphqlClient.syncSecretShares({ shares: syncPayload });
};
