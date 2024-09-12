/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * AES-GCM with PBKDF2 key derivation for passcode/password encryption
 * Spec: https://csrc.nist.gov/pubs/sp/800/38/d/final
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto
 */

const DEFAULT_DERIVE_KEY_ITERATIONS = 100000;
const COMMON_PBKDF2_SALT_SIZE = 16;
const AES_BLOCK_SIZE = 16;
const AES_GCM_IV_SIZE = 12;
const AES_256_GCM_KEY_LENGTH = 256;

export type Encrypted = {
	iv: Uint8Array;
	salt: Uint8Array;
	encrypted: Uint8Array;
};

/**
 * Key derivation from key bytes to AES key
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#pbkdf2_derive_aes_key_from_password
 */
const deriveKey = async (
	keyBytes: Uint8Array,
	salt: Uint8Array,
): Promise<CryptoKey> => {
	const baseKey = await crypto.subtle.importKey(
		'raw',
		keyBytes,
		{ name: 'PBKDF2' },
		false,
		['deriveKey'],
	);

	const derivedKey = await crypto.subtle.deriveKey(
		{
			name: 'PBKDF2',
			iterations: DEFAULT_DERIVE_KEY_ITERATIONS,
			hash: 'SHA-256',
			salt,
		},
		baseKey,
		{ name: 'AES-GCM', length: AES_256_GCM_KEY_LENGTH },
		false,
		['encrypt', 'decrypt'],
	);

	return derivedKey;
};

/**
 * AES encrypting with key string
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#aes-gcm_2
 */
const encrypt = async (data: Uint8Array, key: string): Promise<Encrypted> => {
	const passcodeBytes = new TextEncoder().encode(key);
	const salt = crypto.getRandomValues(new Uint8Array(COMMON_PBKDF2_SALT_SIZE));
	const derivedKey = await deriveKey(passcodeBytes, salt);
	const iv = crypto.getRandomValues(new Uint8Array(AES_GCM_IV_SIZE));

	const encrypted = await crypto.subtle.encrypt(
		{ name: 'AES-GCM', iv },
		derivedKey,
		data,
	);

	return { iv, salt, encrypted: new Uint8Array(encrypted) };
};

/**
 * AES decrypting with key string
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt#aes-gcm
 */
const decrypt = async (
	encrypted: Encrypted,
	key: string,
): Promise<Uint8Array> => {
	const passcodeBytes = new TextEncoder().encode(key);
	const derivedKey = await deriveKey(passcodeBytes, encrypted.salt);

	const data = await crypto.subtle.decrypt(
		{ name: 'AES-GCM', iv: encrypted.iv },
		derivedKey,
		encrypted.encrypted,
	);

	return new Uint8Array(data);
};

const encryptAndMerge = async (
	data: Uint8Array,
	passcode: string,
): Promise<Uint8Array> => {
	const encrypted = await encrypt(data, passcode);

	return mergeEncrypted(encrypted);
};

const mergeEncrypted = (encrypted: Encrypted) => {
	const { iv, salt, encrypted: encryptedData } = encrypted;
	const merged = new Uint8Array(iv.length + salt.length + encryptedData.length);

	merged.set(iv, 0);
	merged.set(salt, iv.length);
	merged.set(encryptedData, iv.length + salt.length);

	return merged;
};

const separateEncrypted = (merged: Uint8Array): Encrypted => {
	if (merged.length < AES_GCM_IV_SIZE + COMMON_PBKDF2_SALT_SIZE) {
		throw new Error(
			'Merged data is too short to contain the IV, salt, and encrypted data.',
		);
	}

	const iv = merged.slice(0, AES_GCM_IV_SIZE);
	const salt = merged.slice(
		AES_GCM_IV_SIZE,
		AES_GCM_IV_SIZE + COMMON_PBKDF2_SALT_SIZE,
	);
	const encrypted = merged.slice(AES_GCM_IV_SIZE + COMMON_PBKDF2_SALT_SIZE);

	return { iv, salt, encrypted };
};

export const aes = {
	encrypt,
	decrypt,
	encryptAndMerge,
	mergeEncrypted,
	separateEncrypted,
};
