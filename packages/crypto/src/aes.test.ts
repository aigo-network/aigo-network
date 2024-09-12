import { aes } from './aes';

describe('test AES', () => {
	const passcode1 = 'helloworld';
	const passcode2 = crypto.getRandomValues(new Uint8Array(6)).toString();
	const alignedData = crypto.getRandomValues(new Uint8Array(32));
	const unalignedData = crypto.getRandomValues(new Uint8Array(17));

	it('encrypt/decrypt with hardcode passcode, size-aligned data', async () => {
		const encryptedData = await aes.encrypt(alignedData, passcode1);
		const decryptedData = await aes.decrypt(encryptedData, passcode1);
		expect(alignedData.toString()).toEqual(decryptedData.toString());
	});

	it('encrypt/decrypt with hardcode passcode, size-unaligned data', async () => {
		const encryptedData = await aes.encrypt(unalignedData, passcode1);
		const decryptedData = await aes.decrypt(encryptedData, passcode1);
		expect(unalignedData.toString()).toEqual(decryptedData.toString());
	});

	it('encrypt/decrypt with random passcode, size-aligned data', async () => {
		const encryptedData = await aes.encrypt(alignedData, passcode2);
		const decryptedData = await aes.decrypt(encryptedData, passcode2);
		expect(alignedData.toString()).toEqual(decryptedData.toString());
	});

	it('encrypt/decrypt with random passcode, size-unaligned data', async () => {
		const encryptedData = await aes.encrypt(unalignedData, passcode2);
		const decryptedData = await aes.decrypt(encryptedData, passcode2);
		expect(unalignedData.toString()).toEqual(decryptedData.toString());
	});

	it('encrypt/decrypt with wrong passcode', async () => {
		try {
			const encryptedData = await aes.encrypt(alignedData, passcode1);
			const passcode3 = crypto.getRandomValues(new Uint8Array(6)).toString();
			await aes.decrypt(encryptedData, passcode3);
		} catch (err) {
			const errMessage = (err as Error).message;
			expect(errMessage).toEqual(
				'The operation failed for an operation-specific reason',
			);
		}
	});
});
