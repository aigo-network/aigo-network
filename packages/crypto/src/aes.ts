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

type PasscodeEncrypted = {
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
 * AES encrypting with passcode
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#aes-gcm_2
 */
const encryptByPasscode = async (
	data: Uint8Array,
	passcode: string,
): Promise<PasscodeEncrypted> => {
	const passcodeBytes = new TextEncoder().encode(passcode);
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
 * AES decrypting with passcode
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt#aes-gcm
 */
const decryptByPasscode = async (
	encryptedData: PasscodeEncrypted,
	passcode: string,
): Promise<Uint8Array> => {
	const passcodeBytes = new TextEncoder().encode(passcode);
	const derivedKey = await deriveKey(passcodeBytes, encryptedData.salt);

	const data = await crypto.subtle.decrypt(
		{ name: 'AES-GCM', iv: encryptedData.iv },
		derivedKey,
		encryptedData.encrypted,
	);

	return new Uint8Array(data);
};

export const aes = { encryptByPasscode, decryptByPasscode };
