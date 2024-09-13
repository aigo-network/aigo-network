import AsyncStorage from '@react-native-async-storage/async-storage';

const PrivateKeyStorageKey = 'encrypted-private-key';

export const getEncryptedPrivateKey = async (): Promise<string | null> => {
	const walletAddress = await AsyncStorage.getItem(PrivateKeyStorageKey);
	return walletAddress;
};

export const setEncryptedPrivateKey = async (
	encryptedPrivateKey: string,
): Promise<void> => {
	await AsyncStorage.setItem(PrivateKeyStorageKey, encryptedPrivateKey);
};

export const cleanEncryptedPrivateKey = async () => {
	await AsyncStorage.removeItem(PrivateKeyStorageKey);
};
