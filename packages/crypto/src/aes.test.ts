import { decryptByPasscode, encryptByPasscode } from './aes';

describe('test AES', () => {
	it('encrypt/decrypt with hardcode passcode, size-aligned data', async () => {
		const passcode = 'helloworld';
		const data = crypto.getRandomValues(new Uint8Array(32));
		const encryptedData = await encryptByPasscode(data, passcode);
		const decryptedData = await decryptByPasscode(encryptedData, passcode);
		expect(data.toString()).toEqual(decryptedData.toString());
	});

	it('encrypt/decrypt with hardcode passcode, non-aligned data', async () => {
		const passcode = 'helloworld';
		const data = crypto.getRandomValues(new Uint8Array(30));
		const encryptedData = await encryptByPasscode(data, passcode);
		const decryptedData = await decryptByPasscode(encryptedData, passcode);
		expect(data.toString()).toEqual(decryptedData.toString());
	});

	it('encrypt/decrypt with random passcode, size-aligned data', async () => {
		const passcode = crypto.getRandomValues(new Uint8Array(6)).toString();
		const data = crypto.getRandomValues(new Uint8Array(17));
		const encryptedData = await encryptByPasscode(data, passcode);
		const decryptedData = await decryptByPasscode(encryptedData, passcode);
		expect(data.toString()).toEqual(decryptedData.toString());
	});

	it('encrypt/decrypt with random passcode, non-aligned data', async () => {
		const passcode = crypto.getRandomValues(new Uint8Array(6)).toString();
		const data = crypto.getRandomValues(new Uint8Array(17));
		const encryptedData = await encryptByPasscode(data, passcode);
		const decryptedData = await decryptByPasscode(encryptedData, passcode);
		expect(data.toString()).toEqual(decryptedData.toString());
	});
});
