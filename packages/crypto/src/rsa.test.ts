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
});
