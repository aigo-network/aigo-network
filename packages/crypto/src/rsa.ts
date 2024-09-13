/**
 * RSA-OAEP for public key encryption
 * Spec: https://datatracker.ietf.org/doc/html/rfc3447
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto
 */

const generateKeypair = (
	modulusLength: 2048 | 4096 = 2048,
): Promise<CryptoKeyPair> => {
	return crypto.subtle.generateKey(
		{
			name: 'RSA-OAEP',
			modulusLength,
			publicExponent: new Uint8Array([1, 0, 1]),
			hash: 'SHA-256',
		},
		true,
		['encrypt', 'decrypt'],
	);
};

const importKey = async (
	keyBytes: Uint8Array,
	keyType: 'public' | 'private',
): Promise<CryptoKey> => {
	const key = await crypto.subtle.importKey(
		keyType === 'public' ? 'spki' : 'pkcs8',
		keyBytes,
		// react-native-quick-crypto only normalizes hash string (not object)
		{ name: 'RSA-OAEP', hash: 'SHA-256' },
		true,
		keyType === 'public' ? ['encrypt'] : ['decrypt'],
	);

	return key;
};

const exportKey = async (keypair: CryptoKeyPair) => {
	const publicKey = await crypto.subtle.exportKey('spki', keypair.publicKey);
	const privateKey = await crypto.subtle.exportKey('pkcs8', keypair.privateKey);
	return {
		publicKey: new Uint8Array(publicKey),
		privateKey: new Uint8Array(privateKey),
	};
};

/**
 * RSA-OAEP encrypt message with public key
 */
const encrypt = async (
	data: Uint8Array,
	publicKey: CryptoKey,
): Promise<Uint8Array> => {
	const encrypted = await crypto.subtle.encrypt(
		{ name: 'RSA-OAEP' },
		publicKey,
		data,
	);

	return new Uint8Array(encrypted);
};

/**
 * RSA-OAEP decrypt message with private key
 */
const decrypt = async (
	data: Uint8Array,
	privateKey: CryptoKey,
): Promise<Uint8Array> => {
	const decrypted = await crypto.subtle.decrypt(
		{ name: 'RSA-OAEP' },
		privateKey,
		data,
	);

	return new Uint8Array(decrypted);
};

export const rsa = {
	generateKeypair,
	importKey,
	exportKey,
	encrypt,
	decrypt,
};
