import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserInfo = {
	displayName: string;
	email: string;
};

const userInfoPrefix = 'DefaultUserInfo';

/**
 * store user info sign-in with Apple, these info is only provided at the first time sign-in with Apply.
 * After that these field is always null, so we need to store this info to revise onboarding flow
 */
export const setDefaultUserInfo = async (userInfo: UserInfo) => {
	const promises = Object.keys(userInfo).map(async (key) => {
		await AsyncStorage.setItem(
			`${userInfoPrefix}-${key}`,
			userInfo[key as keyof UserInfo],
		);
	});
	await Promise.all(promises);
};

export const getDefaultUserInfo = async () => {
	const userInfo: UserInfo = { displayName: '', email: '' };
	const promises = Object.keys(userInfo).map(async (key) => {
		const value = await AsyncStorage.getItem(`${userInfoPrefix}-${key}`);
		if (value) userInfo[key as keyof UserInfo] = value;
	});
	await Promise.all(promises);

	return userInfo;
};

export const cleanDefaultUserInfo = async () => {
	const userInfo: UserInfo = { displayName: '', email: '' };
	const promises = Object.keys(userInfo).map(async (key) => {
		await AsyncStorage.removeItem(`${userInfoPrefix}-${key}`);
	});
	await Promise.all(promises);
};
