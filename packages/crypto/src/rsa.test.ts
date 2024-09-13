import bs58 from 'bs58';

import { rsa } from './rsa';

describe('test RSA', () => {
	const alignedData = crypto.getRandomValues(new Uint8Array(32));
	const unalignedData = crypto.getRandomValues(new Uint8Array(17));

	it('encrypt/decrypt with hardcode passcode, size-aligned data', async () => {
		const keypair = await rsa.generateKeypair();
		const encryptedData = await rsa.encrypt(alignedData, keypair.publicKey);
		const decryptedData = await rsa.decrypt(encryptedData, keypair.privateKey);
		expect(alignedData.toString()).toEqual(decryptedData.toString());
	});

	it('encrypt/decrypt with hardcode passcode, size-unaligned data', async () => {
		const keypair = await rsa.generateKeypair();
		const encryptedData = await rsa.encrypt(unalignedData, keypair.publicKey);
		const decryptedData = await rsa.decrypt(encryptedData, keypair.privateKey);
		expect(unalignedData.toString()).toEqual(decryptedData.toString());
	});

	it('encrypt/decrypt with random passcode, size-aligned data', async () => {
		const keypair = await rsa.generateKeypair(4096);
		const encryptedData = await rsa.encrypt(alignedData, keypair.publicKey);
		const decryptedData = await rsa.decrypt(encryptedData, keypair.privateKey);
		expect(alignedData.toString()).toEqual(decryptedData.toString());
	});

	it('encrypt/decrypt with random passcode, size-unaligned data', async () => {
		const keypair = await rsa.generateKeypair(4096);
		const encryptedData = await rsa.encrypt(unalignedData, keypair.publicKey);
		const decryptedData = await rsa.decrypt(encryptedData, keypair.privateKey);
		expect(unalignedData.toString()).toEqual(decryptedData.toString());
	});

	it('encrypt/decrypt with wrong passcode', async () => {
		try {
			const keypair = await rsa.generateKeypair();
			const keypair2 = await rsa.generateKeypair();
			const encryptedData = await rsa.encrypt(alignedData, keypair.publicKey);
			await rsa.decrypt(encryptedData, keypair2.privateKey);
		} catch (err) {
			const errMessage = (err as Error).message;
			expect(errMessage).toEqual(
				'The operation failed for an operation-specific reason',
			);
		}
	});

	it('encrypt/decrypt with import/export key', async () => {
		const keypair = await rsa.generateKeypair();
		const exportedKeypair = await rsa.exportKey(keypair);
		const importedPublicKey = await rsa.importKey(
			exportedKeypair.publicKey,
			'public',
		);
		const importedPrivateKey = await rsa.importKey(
			exportedKeypair.privateKey,
			'private',
		);
		const reExportedKeypair = await rsa.exportKey({
			publicKey: importedPublicKey,
			privateKey: importedPrivateKey,
		});

		// console.log(bs58.encode(exportedKeypair.publicKey));
		// console.log(bs58.encode(exportedKeypair.privateKey));
		expect(exportedKeypair.publicKey.toString()).toEqual(
			reExportedKeypair.publicKey.toString(),
		);
		expect(bs58.encode(exportedKeypair.publicKey)).toEqual(
			bs58.encode(reExportedKeypair.publicKey),
		);
		expect(exportedKeypair.privateKey.toString()).toEqual(
			reExportedKeypair.privateKey.toString(),
		);
		expect(bs58.encode(exportedKeypair.privateKey)).toEqual(
			bs58.encode(reExportedKeypair.privateKey),
		);

		const encrypted = await rsa.encrypt(unalignedData, importedPublicKey);
		const decrypted = await rsa.decrypt(encrypted, importedPrivateKey);
		expect(unalignedData.toString()).toEqual(decrypted.toString());
	});
});
