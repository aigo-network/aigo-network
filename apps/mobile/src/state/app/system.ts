import AsyncStorage from '@react-native-async-storage/async-storage';

export enum AppStage {
	INITIALIZING = 'INITIALIZING',
	INITIALIZED = 'INITIALIZED',
}

const AppStageKey = 'app-stage';

let appStageInCurrentSession: AppStage;

/**
 * return application stage in current session.
 * It will turn stage to INITIALIZED for the next session after first-time app opening
 */
export const getCurrentAppStage = async (): Promise<AppStage> => {
	if (!appStageInCurrentSession) {
		const storedStage = await AsyncStorage.getItem(AppStageKey);
		if (!storedStage) {
			// only for first-time app opening
			appStageInCurrentSession = AppStage.INITIALIZING;

			// for the next app session
			await AsyncStorage.setItem(AppStageKey, AppStage.INITIALIZED);
		} else {
			appStageInCurrentSession = storedStage as AppStage;
		}
	}

	return appStageInCurrentSession;
};
