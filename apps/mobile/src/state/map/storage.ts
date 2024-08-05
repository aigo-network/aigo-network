import AsyncStorage from '@react-native-async-storage/async-storage';

const LastTripIdKey = 'last-trip-id';

export const getLastTripId = async (): Promise<string | null> => {
	return await AsyncStorage.getItem(LastTripIdKey);
};

export const setLastTripId = async (id: string): Promise<void> => {
	return await AsyncStorage.setItem(LastTripIdKey, id);
};

export const removeLastTripId = async (): Promise<void> => {
	return await AsyncStorage.removeItem(LastTripIdKey);
};
