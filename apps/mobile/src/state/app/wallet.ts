import AsyncStorage from '@react-native-async-storage/async-storage';

export enum AppStage {
	INITIALIZING = 'INITIALIZING',
	INITIALIZED = 'INITIALIZED',
}

const WalletAddressStorageKey = 'wallet-address';
const PrivateKeyStorageKey = 'encrypted-private-key';

export const getWalletAddress = async (): Promise<string | null> => {
	const walletAddress = await AsyncStorage.getItem(WalletAddressStorageKey);
	return walletAddress;
};

export const setWalletAddress = async (
	walletAddress: string,
): Promise<void> => {
	await AsyncStorage.setItem(WalletAddressStorageKey, walletAddress);
};

export const getEncryptedPrivateKey = async (): Promise<string | null> => {
	const walletAddress = await AsyncStorage.getItem(PrivateKeyStorageKey);
	return walletAddress;
};

export const setEncryptedPrivateKey = async (
	encryptedPrivateKey: string,
): Promise<void> => {
	await AsyncStorage.setItem(PrivateKeyStorageKey, encryptedPrivateKey);
};
